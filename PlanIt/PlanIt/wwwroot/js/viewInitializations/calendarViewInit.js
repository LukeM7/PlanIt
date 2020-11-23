function selectAllCategories() {
    var toggleAllInput = document.getElementById('toggle-all-categories-input');
    toggleAllInput.checked = true;
    document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All Off';
    var checkboxes = document.getElementsByClassName('category-checkbox');
    for (var checkbox of checkboxes) {
        checkbox.checked = true;
    }
}

function selectDailyView() {
    document.getElementById('day-view').checked = true;
}

selectAllCategories();
selectDailyView();
