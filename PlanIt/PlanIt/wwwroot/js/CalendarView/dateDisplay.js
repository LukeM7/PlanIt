var currentDisplayedDate = new Date();



const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



// in: date object
function dateToString(date) {
//months start at zero, so add 1 to month value:

    const fullYear = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day.toString();
    }
    else {
        day = day.getDate().toString();
    }
    return fullYear + '-' + month + '-' + day;
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


function updateCalendarDateDisplay(modelJSON) {
    //check whether today's headline is running (it's a special refreshing function)   
    var todayH = document.getElementById('today-headline');
    if (todayH != null) {
        todayH.parentElement.removeChild(todayH);
    }


    const today = new Date();
    const headline = dateAsHeadline(currentDisplayedDate);   
    if (dateAsHeadline(today) == headline) {
        setDateHeadlineToday();  
    }
    else {
        document.getElementById('calendar-headline').innerHTML = headline;
    }
    displayEvents(modelJSON, dateToString(currentDisplayedDate)); 
}



function showToday(modelJSON) {
    currentDisplayedDate = new Date();
    updateCalendarDateDisplay(modelJSON);
}

function showPreviousDay(modelJSON) {
    currentDisplayedDate.setDate(currentDisplayedDate.getDate() - 1);
    updateCalendarDateDisplay(modelJSON);
}

function showNextDay(modelJSON) {
    currentDisplayedDate.setDate(currentDisplayedDate.getDate() + 1);
    updateCalendarDateDisplay(modelJSON);
}

