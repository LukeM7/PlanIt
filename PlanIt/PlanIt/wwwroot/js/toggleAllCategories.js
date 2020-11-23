document.getElementById('toggle-all-categories-input').onclick = function () {
    var checkboxes = document.getElementsByClassName('category-checkbox');
    for (var checkbox of checkboxes) {
        checkbox.checked = this.checked;
    }
    if (this.checked == true) {
        document.getElementByID('toggle-all-label').innerHTML = 'Toggle All Off';
    }
    else  {
        document.getElementByID('toggle-all-label').innerHTML = 'Toggle All On';
    }
}