function selectDailyView() {
    document.getElementById('day-view').checked = true;
}
function setDisplayZoom() {
    var eventPaddedContainer = document.getElementById('event-padded-outer-container');
    eventPaddedContainer.style.width = '125%';
    document.getElementById('timeline-img').style.width = '125%';
    document.getElementById('zoom-level-text').innerHTML = '125%';
    adjustPadding(eventPaddedContainer); //from dailyViewZoomDisplay.js
}



setDisplayZoom();
selectDailyView();

var eventsJSON = {
    "events": [
        { "title": "event0", "startingHour": 0.0, "duration": 180, "color": "#bc665c"},
        { "title": "event1", "startingHour": 1.0, "duration": 180, "color": "#e3874a" },
        { "title": "event2", "startingHour": 3.25, "duration": 120, "color": "#f0d05c" },
        { "title": "event3", "startingHour": 2.5, "duration": 90, "color": "#f0d05c" },
        { "title": "event4", "startingHour": 3.5, "duration": 120, "color": "#8a86c6" },
        { "title": "event5", "startingHour": 4, "duration": 120, "color": "#8a86c6" }
    ]
};
displayEvents(eventsJSON, 0); //from displayEvent.js

