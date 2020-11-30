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


displayEvents(eventsJSON, dateToString(currentDisplayedDate)); //from displayEvent.js, note: eventsJSON temporarily stored in dateDisplay.js

