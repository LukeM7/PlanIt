function updateCalendarDate(date) {
    //check whether today's headline is running (it's a special refreshing function) 
    var todayH = document.getElementById('today-headline');
    if (todayH != null) {
        todayH.parentElement.removeChild(todayH);
    }
    const d = parseDate(date);
    const today = new Date();

    const headline = dateAsHeadline(d); //from CalendarView/dateDisplay.js 
    if (dateAsHeadline(today) == headline) {
        setDateHeadlineToday(); //from CalendarView/dateDisplay.js
    }
    else {
        document.getElementById('calendar-headline').innerHTML = headline; 
    }
    alert('call displayEvents(eventsJSON, date) function once events can\nproperly be read from the model'); 
    //displayEvents(eventsJSON, date); 
}

function searchDate(date) {
    if (date != "") {
        updateCalendarDate(date);
    }
    else {
        alert('date is incomplete');
    }
}
