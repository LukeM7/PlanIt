function selectDailyView() {
    document.getElementById('day-view').checked = true;
}
function initDisplayZoom() {
    var eventPaddedContainer = document.getElementById('event-padded-outer-container');
    eventPaddedContainer.style.width = '125%';
    document.getElementById('timeline-img').style.width = '125%';
    document.getElementById('zoom-level-text').innerHTML = '125%';
    adjustPadding(eventPaddedContainer); //from dailyViewZoomDisplay.js
}
function initDateHeadline() {
    setDateHeadlineToday(); //from dateDisplay.js
}

selectDailyView();
initDisplayZoom();
initDateHeadline();

var d = new Date();
//months start at zero, so add 1 to month value: 
var date = d.getFullYear().toString() + '-' + (d.getMonth() + 1).toString() + '-' + d.getDate().toString();
var eventsJSON = {
    "events": [
        { "title": "event0", "startingHour": 0.0, "duration": 180, "color": "#bc665c", "date": "2020-11-28" },
        { "title": "event1", "startingHour": 1.0, "duration": 180, "color": "#e3874a", "date": "2020-11-28" },
        { "title": "event2", "startingHour": 3.25, "duration": 120, "color": "#f0d05c", "date": "2020-11-27" },
        { "title": "event3", "startingHour": 2.5, "duration": 90, "color": "#f0d05c", "date": "2020-11-28" },
        { "title": "event4", "startingHour": 3.5, "duration": 120, "color": "#8a86c6", "date": "2020-11-28" },
        { "title": "event5", "startingHour": 7.0, "duration": 90, "color": "#8a86c6", "date": "2020-11-29" },
        { "title": "event6", "startingHour": 11.0, "duration": 180, "color": "#bc665c", "date": "2020-11-29" },
        { "title": "event7", "startingHour": 21.0, "duration": 60, "color": "#e3874a", "date": "2020-11-29" },
        { "title": "event8", "startingHour": 9.0, "duration": 120, "color": "#f0d05c", "date": "2020-11-29" },
        { "title": "event9", "startingHour": 12.0, "duration": 90, "color": "#f0d05c", "date": "2020-11-29" },
        { "title": "event10", "startingHour": 15.0, "duration": 120, "color": "#8a86c6", "date": "2020-11-28" },
        { "title": "event11", "startingHour": 17.0, "duration": 120, "color": "#8a86c6", "date": "2020-11-28" }
    ]
};
displayEvents(eventsJSON, date); //from displayEvent.js

