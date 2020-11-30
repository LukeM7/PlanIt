var eventsJSON = {
    "events": [
        { "title": "event0", "startingHour": 0.0, "duration": 180, "color": "#bc665c", "date": "2020-11-28" },
        { "title": "event1", "startingHour": 1.0, "duration": 180, "color": "#e3874a", "date": "2020-11-28" },
        { "title": "event2", "startingHour": 3.25, "duration": 120, "color": "#f0d05c", "date": "2020-11-27" },
        { "title": "event3", "startingHour": 2.5, "duration": 90, "color": "#f0d05c", "date": "2020-11-28" },
        { "title": "event4", "startingHour": 3.5, "duration": 120, "color": "#8a86c6", "date": "2020-11-28" },
        { "title": "event5", "startingHour": 7.0, "duration": 90, "color": "#8a86c6", "date": "2020-11-29" },
        { "title": "event6", "startingHour": 11.0, "duration": 180, "color": "#bc665c", "date": "2020-11-29" },
        { "title": "event7", "startingHour": 21.0, "duration": 60, "color": "#e3874a", "date": "2020-11-29" },
        { "title": "event8", "startingHour": 9.0, "duration": 120, "color": "#f0d05c", "date": "2020-11-29" },
        { "title": "event9", "startingHour": 12.0, "duration": 90, "color": "#f0d05c", "date": "2020-11-29" },
        { "title": "event10", "startingHour": 15.0, "duration": 120, "color": "#8a86c6", "date": "2020-11-28" },
        { "title": "event11", "startingHour": 17.0, "duration": 120, "color": "#8a86c6", "date": "2020-11-28" }
    ]
};
var currentDisplayedDate = new Date();



const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// 'YYYY-MM-DD'
function parseDate(s) {
    //  the /\D/ here is a metacharacter for any value that is a nondigit

    var d = s.split(/\D/);
    //d = [YYYY, MM, DD]
    //d[1] is being decremented by 1, for some reason this has to happen.
    return new Date(d[0], --d[1], d[2]);
}

function dateToString(date) {
//months start at zero, so add 1 to month value:

    return date.getFullYear().toString()
        + '-' + (date.getMonth() + 1).toString()
        + '-' + date.getDate().toString();
}

function dateAsHeadline(date) {
    var s = '';
    s += weekDayNames[date.getDay()] + ', ';
    s += monthNames[date.getMonth()] + ' ';
    s += date.getDate().toString() + ', ';
    s += date.getFullYear();
    return s;
}


function GetClock() {
    var currentDisplayedDate = new Date();
    var nday = currentDisplayedDate.getDay(),
        nmonth = currentDisplayedDate.getMonth(),
        ndate = currentDisplayedDate.getDate(),
        nyear = currentDisplayedDate.getFullYear();
    var nhour = currentDisplayedDate.getHours(),
        nmin = currentDisplayedDate.getMinutes(),
        nsec = currentDisplayedDate.getSeconds(),
        ap;

    if (nhour == 0) { ap = " AM"; nhour = 12; }
    else if (nhour < 12) { ap = " AM"; }
    else if (nhour == 12) { ap = " PM"; }
    else if (nhour > 12) { ap = " PM"; nhour -= 12; }

    if (nmin <= 9) nmin = "0" + nmin;
    if (nsec <= 9) nsec = "0" + nsec;

    var clocktext = "" + weekDayNames[nday] + ", " + monthNames[nmonth] + " " + ndate + ", " + nyear + " " + nhour + ":" + nmin + ":" + nsec + ap + "";
    document.getElementById('today-headline').innerHTML = clocktext;
}

function setDateHeadlineToday() {
    var container = document.getElementById('calendar-headline');
    container.innerHTML = '';
    var todayHeadline = document.createElement('span');
    todayHeadline.id = 'today-headline';
    container.appendChild(todayHeadline);
    currentDisplayedDate = new Date();
    GetClock();
    var interval = setInterval(function () {
        if (document.getElementById('today-headline') == null) {
            clearInterval(interval);
            return;
        }
        GetClock();
    } , 1000);
}


//IN: 'YYYY-MM-DD' 
function updateCalendarDate(dateString) {
    //check whether today's headline is running (it's a special refreshing function)   
    var todayH = document.getElementById('today-headline');
    if (todayH != null) {
        todayH.parentElement.removeChild(todayH);
    }

    currentDisplayedDate = parseDate(dateString); //returns actual date object
    const today = new Date();

    const headline = dateAsHeadline(currentDisplayedDate);   
    if (dateAsHeadline(today) == headline) {
        setDateHeadlineToday();  
    }
    else {
        document.getElementById('calendar-headline').innerHTML = headline;
    }
    alert('updateCalendarDate() says: read events from model instead of from calendarViewInit');
    displayEvents(eventsJSON, dateString); 
}



function showToday() {
    setDateHeadlineToday(); //sets currentDisplayDate to today 
    displayEvents(eventsJSON, dateToString(currentDisplayedDate));
}

function showPreviousDay() {
    currentDisplayedDate.setDate(currentDisplayedDate.getDate() - 1);
    updateCalendarDate(dateToString(currentDisplayedDate));
}

function showNextDay(date) {
    currentDisplayedDate.setDate(currentDisplayedDate.getDate() + 1);
    updateCalendarDate(dateToString(currentDisplayedDate));
}

