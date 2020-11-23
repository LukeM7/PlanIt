document.getElementById('toggle-all-categories-input').onclick = function () {
    var checkboxes = document.getElementsByClassName('category-checkbox');
    for (var checkbox of checkboxes) {
        checkbox.checked = this.checked;
    }

    if (this.checked == true) {
        document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All Off';
    }
    else {
        document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All On';
    }
}