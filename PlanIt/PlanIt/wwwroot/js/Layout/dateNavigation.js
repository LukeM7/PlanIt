//IN: 'YYYY-MM-DD' 
function searchDate(date) {
    if (date != "") {
        updateCalendarDateDisplay(date); //from CalendarView/dateDisplay.js
    }
    else {
        alert('date is incomplete');
    }
}
