function selectDailyView() {
    document.getElementById('day-view').checked = true;
}
function setDisplayZoom() {
    var eventContainer = document.getElementById('event-container');
    eventContainer.style.width = '125%';
    document.getElementById('daily-view-display-img').style.width = '125%';
    document.getElementById('zoom-level-text').innerHTML = '125%';
    adjustPadding(eventContainer);
}



setDisplayZoom();
selectDailyView();
