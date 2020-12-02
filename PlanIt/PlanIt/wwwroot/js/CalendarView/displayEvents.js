//idea: Title, duration, start time, color, date, category
//will be passed in as a JSON.
//here I'm using a simple array rather than a JSON, and
//I'm not including color, date, or cateogory yet for simplicity.

//this function will be called upon loading the page, any time
//an event is added or deleted, or when a category is toggled.
//It's basically an update() function which pulls from the model


function calculateHorizPosition(startTime) {
    //position is start time
    var pos = startTime;
    //align by the hour (over 24), multiply by 100 (for a percentage width) -> divide by 24/100
    pos /= 0.24;

    return pos.toString() + '%';
}
function calculateWidth(duration) {
    //width is the duration
    var width = duration;
    //divide by 24 (number of minutes in a day), multiply by 100 (for a percentage width)
    width /= 0.24;
    
    return width.toString() + '%';
}

function doesOverlap(startA, endA, startB, endB) {
    if ((startB <= startA && startA < endB) || (startA <= startB && startB < endA)) {
        return true;
    }
    else {
        return false;
    }
}

//for debugging:  
function eventsString(events) {
    var s = '';
    for (var i = 0; i < events.length; i++) {
        s += events[i].Title;
        if (i + 1 < events.length) {
            s += ', ';
        } 
    }
    return s;
}


function layerIsOpen(eventStart, eventEnd, eventsOnLayer) {

    for (var i = 0; i < eventsOnLayer.length; i++) {
        var evtOL = eventsOnLayer[i];
        const ithStart = evtOL.StartTime;
        const ithEnd = ithStart + (evtOL.Duration);
        alert('comparing: (' + eventStart.toString() + ', ' + eventEnd.toString()
            + ') to (' + ithStart.toString() + ', ' + ithEnd.toString() + ')');
        if (doesOverlap(eventStart, eventEnd, ithStart, ithEnd)) {
            return false;
        }
    }
    return true;
}

 
function generateStructure(events) {
    if (events.length <= 0) {
        return;
    }
    var layers = [[events[0]]];
    for (var i = 1; i < events.length; i++) {
        var evt = events[i];
        const eventStart = evt.StartTime;
        alert('duration: ' + evt.Duration);
        const eventEnd = eventStart + (evt.Duration);
        for (var layer = 0; layer < layers.length; layer++) {
            if (layerIsOpen(eventStart, eventEnd, layers[layer])) {
                alert('open, event: ' + evt.Title);
                layers[layer].push(evt);
                break;
            }
            else {
                if (layer == layers.length - 1) {
                    layers.push([evt]);
                    break;
                }
            }
        }
    }
    return layers;
}


function flushEventsContainer(container) {
    while (container.firstChild != null) {
        //for debugging: alert('removing ' + container.lastChild.id);
        container.removeChild(container.lastChild);
    }
}

//forDate must be a string with the following format: " YYYY-MM-DD " 
function displayEvents(modelJSON, forDate) {
    var container = document.getElementById('event-inner-container');
    flushEventsContainer(container);

    var eventsOnDate = [];
    var eventColors = [];
    for (var i = 0; i < modelJSON.Categories.length; i++) {
        var ctg = modelJSON.Categories[i];
        for (j = 0; j < ctg.Events.length; j++) {
            if (ctg.Events[j].StartDate == forDate) {
                eventsOnDate.push(ctg.Events[j]);
                eventColors.push[ctg.Color];
            }
        }
    }
    var eventLayers = generateStructure(eventsOnDate);
    for (var layer = 0; layer < eventLayers.length; layer++) {
        for (var i = 0; i < eventLayers[layer].length; i++) {
            const event = eventLayers[layer][i];

            const leftPos = calculateHorizPosition(event.StartTime);
            const width = calculateWidth(event.Duration);
            const bottomPos = (layer * 44).toString() + 'px';
            //create element and add it to view:

            var eventSpan = document.createElement('span');
            eventSpan.className = 'event';
            eventSpan.id = 'event-withID-' + event.Title;
            eventSpan.addEventListener('click', function () {
                alert('bring up event editor for ' + eventSpan.id);
            });
            
            eventSpan.style.width = width;
            eventSpan.style.left = leftPos;
            eventSpan.style.bottom = bottomPos;
            eventSpan.style.backgroundColor = "#CCCCCC";
            eventSpan.innerHTML = event.Title;

            container.appendChild(eventSpan);
        }
    }
}



