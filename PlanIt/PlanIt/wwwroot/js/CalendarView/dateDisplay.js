
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function dateAsHeadline(date) {
    var s = '';
    s += weekDayNames[date.getDay()] + ', ';
    s += monthNames[date.getMonth()] + ' ';
    s += date.getDate().toString() + ', ';
    s += date.getFullYear();
    return s;
}

function parseDate(s) {
    //  the /\D/ here is a metacharacter for any value that is a nondigit

    var d = s.split(/\D/);
    //d[1] is being decremented by 1, for some reason this has to happen. 
    return new Date(d[0], --d[1], d[2]);
}


function GetClock() {
    var d = new Date();
    var nday = d.getDay(), nmonth = d.getMonth(), ndate = d.getDate(), nyear = d.getFullYear();
    var nhour = d.getHours(), nmin = d.getMinutes(), nsec = d.getSeconds(), ap;

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
    GetClock();
    var interval = setInterval(function () {
        GetClock();
        if (document.getElementById('today-headline') == null) {
            clearInterval(interval);
        }
    } , 1000);
}
