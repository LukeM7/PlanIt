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


function initLayoutView() {
    selectCalendarPage();
    initSearchBar();
}







