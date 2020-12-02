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
function initPrevTodNextBtns(modelsJSON) {
    document.getElementById('previous-button').addEventListener('click', function () {
        showPreviousDay(modelsJSON);
    });
    document.getElementById('today-button').addEventListener('click', function () {
        showToday(modelsJSON);
    });
    document.getElementById('next-button').addEventListener('click', function () {
        showNextDay(modelsJSON);
    });
}

function initCalendarDailyView(modelsJSON) {
    selectDailyView();
    initDisplayZoom();
    initPrevTodNextBtns(modelsJSON);
    showToday(modelsJSON);
}
