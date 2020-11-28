function selectCalendarPage() {
    document.getElementById('npi-calendar-page-input').checked = true;
}

function searchDate(date) {
    if (date != "") {
        var dateHeadline = document.getElementById('calendar-headline');
        dateHeadline.innerHTML = date;
        //call this when you can properly access a JSON from the model 
        //displayEvents(eventsJSON, date);
    }
    else {
        alert('date is empty');
    }
}

function activateSearchBar() {
    var searchBar = document.getElementById('date-search-input');
    var searchButton = document.getElementById('date-search-button');
    searchBar.addEventListener('keyup', function (event) {
        //keyCode 13 is the return button

        if (event.keyCode == 13) {
            searchDate(this.value);
        }
    });
    searchButton.addEventListener('click', function () {
        searchDate(searchBar.value);
    });
}


var categoriesJSON = {
    "categories": [
        { "title": "General", "color": "#bc665c" },
        { "title": "School", "color": "#e3874a" },
        { "title": "Internship", "color": "#f0d05c" },
        { "title": "Soccer", "color": "#74b2e2" },
        { "title": "PT", "color": "#86c6b9" },
        { "title": "Doctor", "color": "#869ec6" },
        { "title": "Chores", "color": "#8a86c6" },
        { "title": "Dates<3", "color": "#cb80bf" },
        { "title": "I dunno", "color": "#a06abe" },
        { "title": "Yarr", "color": "#ce6474" }
    ]
};

function initToggleAll(categoriesJSON) {
    var toggleAll = document.getElementById('toggle-all-categories-input');
    
    toggleAll.checked = true;
    document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All Off';
    toggleAll.addEventListener('change', function () {
        toggleAllCategories(this, categoriesJSON);
    })
    
}

selectCalendarPage();
activateSearchBar();

buildCategoriesTable(categoriesJSON);
initToggleAll(categoriesJSON);







