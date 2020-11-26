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

//event 1: starts at 12pm, duration is 2 hrs; event 3: starts at 6pm, duration is 1hr 30min
var events = [["event1", 12, 120], ["event2", 8, 60], ["event3", 18, 90], ["event4", 0, 180]];
displayEvents(events, 0); //from displayEvent.js

