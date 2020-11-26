function selectDailyView() {
    document.getElementById('day-view').checked = true;
}
function setDisplayZoom() {
    var eventPaddedContainer = document.getElementById('event-padded-outer-container');
    eventPaddedContainer.style.width = '125%';
    document.getElementById('timeline-img').style.width = '125%';
    document.getElementById('zoom-level-text').innerHTML = '125%';
    adjustPadding(eventPaddedContainer);
}



setDisplayZoom();
selectDailyView();
