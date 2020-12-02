var eventsJSON = {
    "events": [
        { "title": "event0", "startingTime": 0.0, "duration": 180, "color": "#bc665c", "startDate": "2020-11-28" },
        { "title": "event1", "startingTime": 1.0, "duration": 180, "color": "#e3874a", "startDate": "2020-11-28" },
        { "title": "event2", "startingTime": 3.25, "duration": 120, "color": "#f0d05c", "startDate": "2020-11-27" },
        { "title": "event3", "startingTime": 2.5, "duration": 90, "color": "#f0d05c", "startDate": "2020-11-28" },
        { "title": "event4", "startingTime": 3.5, "duration": 120, "color": "#8a86c6", "startDate": "2020-11-28" },
        { "title": "event5", "startingTime": 7.0, "duration": 90, "color": "#8a86c6", "startDate": "2020-11-29" },
        { "title": "event6", "startingTime": 11.0, "duration": 180, "color": "#bc665c", "startDate": "2020-11-29" },
        { "title": "event7", "startingTime": 21.0, "duration": 60, "color": "#e3874a", "startDate": "2020-11-29" },
        { "title": "event8", "startingTime": 9.0, "duration": 120, "color": "#f0d05c", "startDate": "2020-11-29" },
        { "title": "event9", "startingTime": 12.0, "duration": 90, "color": "#f0d05c", "startDate": "2020-11-29" },
        { "title": "event10", "startingTime": 15.0, "duration": 120, "color": "#8a86c6", "startDate": "2020-11-28" },
        { "title": "event11", "startingTime": 17.0, "duration": 120, "color": "#8a86c6", "startDate": "2020-11-28" }
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
function updateCalendarDateDisplay(modelJSON, dateString) {
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
    displayEvents(modelJSON, dateString); 
}



function showToday(modelsJSON) {
    setDateHeadlineToday(); //sets currentDisplayDate to today 
    updateCalendarDateDisplay(modelsJSON, dateToString(currentDisplayedDate));
}

function showPreviousDay(modelsJSON) {
    currentDisplayedDate.setDate(currentDisplayedDate.getDate() - 1);
    updateCalendarDateDisplay(modelsJSON, dateToString(currentDisplayedDate));
}

function showNextDay(modelsJSON) {
    currentDisplayedDate.setDate(currentDisplayedDate.getDate() + 1);
    updateCalendarDateDisplay(modelsJSON, dateToString(currentDisplayedDate));
}

