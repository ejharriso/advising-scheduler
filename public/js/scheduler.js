var Calendar = {
    // In the future, these will be loaded from JSON
    settings: {
        sections: [
            {key:"adams", label:"Brandi Adams"},
            {key:"nolan", label:"Andrew Nolan"},
            {key:"renehan", label:"Savannah Renehan"},
            {key:"spring", label:"Neil Spring"}
        ],

        availableAppointments: [
            { text: "Advising1",   start_date: "2013-03-26 12:00", end_date: "2013-03-26 17:00", section_id:"adams"},
            { text: "Advising2",   start_date: "2013-03-26 17:20", end_date: "2013-03-26 19:00", section_id:"adams"},
            { text: "Advising3",   start_date: "2013-03-26 11:00", end_date: "2013-03-26 14:00", section_id:"spring"}
        ]
    },

    init: function() {
        this.configure();
        this.populate();
        this.bind();
    },

    // Configure all of dhtmlxscheduler's settings
    configure: function() {
        var s = this.settings;

        scheduler.locale.labels.unit_tab = "Advisors";
        scheduler.locale.labels.section_custom="Section";
        scheduler.config.xml_date="%Y-%m-%d %H:%i";
        scheduler.config.readonly=true;

        scheduler.createUnitsView({
            name: "unit",
            property: "section_id",
            list: s.sections
        });

        // Set the starting date (temporarily) to March 26, 2013
        scheduler.init('scheduler_here', new Date(2013,2,26), "unit");
    },

    /* Add in any available appointments.
     *
     * Currently loads hardcoded appointments, but will eventually grab these via a REST call.
     */
    populate: function() {
        scheduler.parse(this.settings.availableAppointments, "json");
    },

    // All UI events should be bound here, so that they're all visible in one place
    bind: function() {
        // Prompt to add an appointment when the user clicks on one of the slots
        scheduler.attachEvent("onClick", function(event_id, native_event_object) {
            Flow.prompt_details(event_id, native_event_object);
        });
    }
};

/* Scheduler flow. Lays out a path for the user through the app. */
var Flow = {

    init: function() {
        this.make_dialogs();
    },

    // Initializes all of the dialogs
    make_dialogs: function() {

        // These defaults get applied to all of the dialogs via $.extend
        var dialogDefaults = {
            modal: true,
            draggable: false,
            resizable: false,
            autoOpen: false
        };

        $("#flow_intro").dialog($.extend({}, dialogDefaults, {
            buttons: [
                {
                    text: "Next",
                    click: Flow.show_scheduler
                }
            ]
        }));

        $("#flow_details").dialog($.extend({}, dialogDefaults, {
            buttons: [
                {
                    text: "Cancel",
                    click: this.close_details
                },
                {
                    text: "Make Appointment",
                    click: this.make_appointment
                }
            ]
        }));
    },

    show_intro: function() {
        $("#flow_intro").dialog('open');
    },

    show_scheduler: function() {
        $("#flow_intro").dialog('close');
    },

    prompt_details: function(event_id, native_event_object) {
        var start = Date.parse(scheduler.getEventStartDate(event_id));
        var end = Date.parse(scheduler.getEventEndDate(event_id));

        // 60,000 = 1000ms * 60s
        var appointment_length = 20 * 60000;
        var numSlots = (end - start) / appointment_length;

        for(var i = 0; i < numSlots; i++) {
            var date = new Date(start + (i * appointment_length));

            var timeString = (date.getHours() < 10? "0" : "") + date.getHours() + ":";
            timeString += (date.getMinutes() < 10? "0" : "") + date.getMinutes();

            $("#time_select").append($("<option>", { value: date.toString() }).text(timeString));
        }

        $("#flow_details").dialog('open');
    },

    close_details: function() {
        $("#flow_details").dialog('close');
    },

    make_appointment: function() {
        alert("Appointment made for: " + $("#time_select").val());
    }
};

// Runs once the page is loaded
$(function(){
    Calendar.init();

    // Initialize our Flow module, and have it show the intro.
    Flow.init();
    Flow.show_intro();
});