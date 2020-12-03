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
        $.ajax({
            url: '/Calendar/GetModelJSON',
            type: 'GET',
            success: function (result) {
                modelJSON = JSON.parse(result);
                showPreviousDay(modelJSON);
            },
        });
    });
    document.getElementById('today-button').addEventListener('click', function () {
        $.ajax({
            url: '/Calendar/GetModelJSON',
            type: 'GET',
            success: function (result) {
                modelJSON = JSON.parse(result);
                showToday(modelJSON);
            },
        });
    });
    document.getElementById('next-button').addEventListener('click', function () {
        $.ajax({
            url: '/Calendar/GetModelJSON',
            type: 'GET',
            success: function (result) {
                modelJSON = JSON.parse(result);
                showNextDay(modelJSON);
            },
        });
    });
}
function initToggleAll(modelJSON) {
    var togglerAll = document.getElementById('toggle-all-categories-input');

    togglerAll.checked = true;
    document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All Off';
    togglerAll.addEventListener('change', function () {
        toggleAllCategories(modelJSON);
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
