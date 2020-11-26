//idea: title, duration, start time, color, date, category
//will be passed in as a JSON.
//here I'm using a simple array rather than a JSON, and
//I'm not including color, date, or cateogory yet for simplicity.

//this function will be called upon loading the page, any time
//an event is added or deleted, or when a category is toggled.
//It's basically an update() function which pulls from the model


function calculatePosition(event) {
    //position is start time
    var pos = event[1];
    //align by the hour (over 24), multiply by 100 (for a percentage width) -> divide by 24/100
    pos /= 0.24;

    return pos.toString() + '%';
}
function calculateWidth(event) {
    //width is the duration
    var width = event[2];
    //divide by 1440 (number of minutes in a day), multiply by 100 (for a percentage width)
    width /= 14.4;
    
    return width.toString() + '%';
}
function displayEvents(events, forDate) {
    var container = document.getElementById('event-inner-container');

    var eventsHTML = '';
    for (event of events) {
        //if event.date == forDate {rest of function in here}

        const pos = calculatePosition(event);
        const width = calculateWidth(event);
        eventsHTML += '<span class="event" ';
        eventsHTML += 'style="width: ' + width + '; left: ' + pos + ';" >';
        eventsHTML += event[0];
        eventsHTML += '</span>';
    }
    container.innerHTML = eventsHTML;
}


//event 1: starts at 12pm, duration is 2 hrs; event 3: starts at 6pm, duration is 1hr 20min

var events = [["event1", 12, 120], ["event2", 8, 60], ["event3", 18, 90], ["event4", 0, 180]];
displayEvents(events, 0);

