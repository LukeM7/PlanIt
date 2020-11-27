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
        { "title": "event1", "startingHour": 12, "duration": 120 },
        { "title": "event2", "startingHour": 8, "duration": 60 },
        { "title": "event3", "startingHour": 18, "duration": 90 },
        { "title": "event4", "startingHour": 0, "duration": 180 }
    ]
};
displayEvents(eventsJSON); //from displayEvent.js

