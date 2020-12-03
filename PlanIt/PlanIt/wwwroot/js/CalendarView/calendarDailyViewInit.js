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
function initPrevTodNextBtns(modelJSON) {
    document.getElementById('previous-button').addEventListener('click', function () {
        showPreviousDay(modelJSON);
    });
    document.getElementById('today-button').addEventListener('click', function () {
        showToday(modelJSON);
    });
    document.getElementById('next-button').addEventListener('click', function () {
        showNextDay(modelJSON);
    });
}
function initToggleAll(modelJSON) {
    var toggleAll = document.getElementById('toggle-all-categories-input');

    toggleAll.checked = true;
    document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All Off';
    toggleAll.addEventListener('change', function () {
        toggleAllCategories(this, modelJSON);
    })

}

function initCalendarDailyView(modelJSON) {
    selectDailyView();
    initDisplayZoom();
    initPrevTodNextBtns(modelJSON);
    showToday(modelJSON);

    buildCategoriesTable(modelJSON);
    initToggleAll(modelJSON);
}
