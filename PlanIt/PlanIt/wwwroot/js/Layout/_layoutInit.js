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
        { "title": "General", "color": "LightCoral" },
        { "title": "School", "color": "LightSalmon" },
        { "title": "Internship", "color": "Lavender" },
        { "title": "Soccer", "color": "MediumPurple" },
        { "title": "PT", "color": "LightGreen" },
        { "title": "Doctor", "color": "Olive" },
        { "title": "Chores", "color": "LightSeaGreen" },
        { "title": "Dates<3", "color": "LightSkyBlue" },
        { "title": "I dunno", "color": "Peru" },
        { "title": "Yarr", "color": "red" }
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
activateSearchBar();
selectCalendarPage();
buildCategoriesTable(categoriesJSON);
initToggleAll(categoriesJSON);







