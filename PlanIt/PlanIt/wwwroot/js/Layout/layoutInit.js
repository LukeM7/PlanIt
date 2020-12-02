function selectCalendarPage() {
    document.getElementById('npi-calendar-page-input').checked = true;
}

function initSearchBar() {
    var searchBar = document.getElementById('date-search-input');
    var searchButton = document.getElementById('date-search-button');
    searchBar.addEventListener('keyup', function (event) {
        //keyCode 13 is the return button

        if (event.keyCode == 13) {
            searchDate(this.value); //from /dateNavigation.js     
        }
    });
    searchButton.addEventListener('click', function () {
        searchDate(searchBar.value); //from dateNavigation.js 
    });
}

function initToggleAll(categoriesJSON) {
    var toggleAll = document.getElementById('toggle-all-categories-input');
    
    toggleAll.checked = true;
    document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All Off';
    toggleAll.addEventListener('change', function () {
        toggleAllCategories(this, categoriesJSON);
    })
    
}

function initLayoutView(categoriesJSON) {
    selectCalendarPage();
    initSearchBar();
    buildCategoriesTable(categoriesJSON);
    initToggleAll(categoriesJSON);
}







