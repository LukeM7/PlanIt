// in: 'YYYY-MM-DD'

function parseDate(dateString) {
    //  the /\D/ here is a metacharacter for any value that is a nondigit

    var d = dateString.split(/\D/);
    //d = [YYYY, MM, DD]

    return new Date(d[0], --d[1], d[2]);
}

//IN: 'YYYY-MM-DD'
function searchDate(modelJSON, dateString) {
    if (dateString != "") {
        currentDisplayedDate = parseDate(dateString);
        updateCalendarDateDisplay(modelJSON);
        //from CalendarView/dateDisplay.js
    }
}
