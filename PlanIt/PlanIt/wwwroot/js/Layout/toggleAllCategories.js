function toggleAllCategories(toggleSource) {
    var checkboxes = document.getElementsByClassName('category-checkbox');
    for (var checkbox of checkboxes) {
        checkbox.checked = toggleSource.checked;
    }

    if (toggleSource.checked == true) {
        document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All Off';
    }
    else {
        document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All On';
    }
}