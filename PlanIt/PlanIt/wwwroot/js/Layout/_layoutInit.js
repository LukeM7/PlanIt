function selectCalendarPage() {
    document.getElementById('npi-calendar-page-input').checked = true;
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
        { "title": "I dunno", "color": "Peru" }
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


buildCategoriesTable(categoriesJSON);
initToggleAll(categoriesJSON);
selectCalendarPage();






