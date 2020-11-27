//idea: title, duration, start time, color, date, category
//will be passed in as a JSON.
//here I'm using a simple array rather than a JSON, and
//I'm not including color, date, or cateogory yet for simplicity.

//this function will be called upon loading the page, any time
//an event is added or deleted, or when a category is toggled.
//It's basically an update() function which pulls from the model


function calculatePosition(startingHour) {
    //position is start time
    var pos = startingHour;
    //align by the hour (over 24), multiply by 100 (for a percentage width) -> divide by 24/100
    pos /= 0.24;

    return pos.toString() + '%';
}
function calculateWidth(duration) {
    //width is the duration
    var width = duration;
    //divide by 1440 (number of minutes in a day), multiply by 100 (for a percentage width)
    width /= 14.4;
    
    return width.toString() + '%';
}
function displayEvents(eventsJSON) {
    var container = document.getElementById('event-inner-container');
    for (var i = 0; i < eventsJSON.events.length; i++) {
        const event = eventsJSON.events[i];
        //if eventsJSON.event[i].date == forDate {rest of function in here}
        
        const pos = calculatePosition(event.startingHour);
        const width = calculateWidth(event.duration);
        var eventSpan = document.createElement('span');
        eventSpan.className = 'event';
        eventSpan.style.width = width;
        eventSpan.style.left = pos;
        eventSpan.innerHTML = event.title;
        container.appendChild(eventSpan);
    }
}



