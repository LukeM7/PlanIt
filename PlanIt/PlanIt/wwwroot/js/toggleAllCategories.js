document.getElementById('toggle-all-categories-input').onclick = function () {
    var checkboxes = document.getElementsByClassName('category-checkbox');
    for (var checkbox of checkboxes) {
        checkbox.checked = this.checked;
    }
}