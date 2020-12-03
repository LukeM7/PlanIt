function selectCalendarPage() {
    document.getElementById('npi-calendar-page-input').checked = true;
}

function initSearchBar() {
    var searchBar = document.getElementById('date-search-input');
    var searchButton = document.getElementById('date-search-button');
    searchBar.addEventListener('keyup', function (event) {
        const searchVal = this.value;
        //keyCode 13 is the return button
        if (event.keyCode == 13 && (searchVal != "")) {
            $.ajax({
                url: '/Calendar/GetModelJSON',
                type: 'GET',
                success: function (result) {
                    modelJSON = JSON.parse(result);
                    searchDate(modelJSON, searchVal); //from /dateNavigation.js    
                },
            });
        }
    });
    searchButton.addEventListener('click', function () {
        const searchVal = document.getElementById('date-search-input').value;
        if (searchVal != "") {
            $.ajax({
                url: '/Calendar/GetModelJSON',
                type: 'GET',
                success: function (result) {
                    modelJSON = JSON.parse(result);
                    searchDate(modelJSON, searchBar.value); //from /dateNavigation.js    
                },
            });
        }
    }); 
}


function initLayoutView() {
    selectCalendarPage();
    initSearchBar();
}






