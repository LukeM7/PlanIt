//idea: title, duration, start time, color, date, category
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
        s += events[i].title;
        if (i + 1 < events.length) {
            s += ', ';
        } 
    }
    return s;
}


function layerIsOpen(eventStart, eventEnd, eventsOnLayer) {
    
    for (var i = 0; i < eventsOnLayer.length; i++) {
        const ithStart = eventsOnLayer[i].startTime;
        const ithEnd = ithStart + (eventsOnLayer[i].duration);
        //alert('comparing: (' + eventStart.toString() + ', ' + eventEnd.toString()
        //    + ') to (' + ithStart.toString() + ', ' + ithEnd.toString() + ')');
        if (doesOverlap(eventStart, eventEnd, ithStart, ithEnd)) {
            return false;
        }
    }
    return true;
}

//function calculateOverlapsWithDebug(events) {
//    if (events.length <= 0) {
//        return;
//    }
//    //layers gives the collection of events based on where they overlap
//    //first event will always be open, so this is placed in layer 0 by default:
//    var layers = [ [events[0]] ];
//    for (var i = 1; i < events.length; i++) {
//        const eventStart = events[i].startTime;
//        const eventEnd = eventStart + (events[i].duration);
//        alert('*running for event*: ' + events[i].title);
//        for (var layer = 0; layer < layers.length; layer++) {
//            alert('layers.length = ' + layers.length.toString());
//            alert('events on layer ' + layer.toString() + ': ' + eventsString(layers[layer]));
//            if (layerIsOpen(eventStart, eventEnd, layers[layer])) {
//                alert('layer ' + layer.toString() + ' is open for ' + events[i].title);
//                layers[layer].push(events[i]);
//                break;
//            }
//            else {
//                alert('layer ' + layer.toString() + ' is not open for ' + events[i].title);
//                if (layer == layers.length - 1) {
//                    alert('current layer (' + layer.toString() + ') is the top layer; creating new layer.');
//                    layers.push([events[i]]);
//                    break;
//                }
//            }
//        }
//        for (var layer = 0; layer < layers.length; layer++) {
//            alert('layer ' + layer.toString() + ': ' + eventsString(layers[layer]));
//        }
        
//    }
//    return layers;
//}

//consider making this a controller function, so that adding an event doesn't
//require rebuilding this every time.    
function generateStructure(events) {
    if (events.length <= 0) {
        return;
    }
    var layers = [[events[0]]];
    for (var i = 1; i < events.length; i++) {
        const eventStart = events[i].startTime;
        const eventEnd = eventStart + (events[i].duration);
        for (var layer = 0; layer < layers.length; layer++) {
            if (layerIsOpen(eventStart, eventEnd, layers[layer])) {
                layers[layer].push(events[i]);
                break;
            }
            else {
                if (layer == layers.length - 1) {
                    layers.push([events[i]]);
                    break;
                }
            }
        }
    }
    return layers;
}

//string format for dates: " YYYY-MM-DD "  
function getEventsOnDate(events, forDate) {
    var eventsOnDate = [];
    for (var i = 0; i < events.length; i++) {
        if (events[i].startDate == forDate) {
            // for debug: alert('pushing ' + events[i].title);
            eventsOnDate.push(events[i]);
        }
    }
    //for debugging: alert('eventsOnDate: ' + eventsString(eventsOnDate));
    return eventsOnDate;
}

function flushEventsContainer(container) {
    while (container.firstChild != null) {
        //for debugging: alert('removing ' + container.lastChild.id);
        container.removeChild(container.lastChild);
    }
}

//forDate must be a string with the following format: " YYYY-MM-DD " 
function displayEvents(categoriesJSON, forDate) {
    var container = document.getElementById('event-inner-container');
    flushEventsContainer(container);

    var allEvents = [];
    //var colors = [];
    for (var i = 0; i < categoriesJSON.categories.length; i++) {
        var ctg = categoriesJSON.categories[i]
        if (ctg.events.length > 0) {
            allEvents.push(...(ctg.events));
        }
    }
    //create a new array of events only out of those included for a given date

    // for debugging: alert('displayEvents() days: function called for date: ' + forDate);

    var eventsOnDate = getEventsOnDate(allEvents, forDate);
    if (eventsOnDate.type == 'undefined') {
        alert('no events for today');
        return;
    }
    //instead of passing in whole JSON, replace with array of events on given date:    
    var eventLayers = generateStructure(eventsOnDate);
    for (var layer = 0; layer < eventLayers.length; layer++) {
        for (var i = 0; i < eventLayers[layer].length; i++) {
            const event = eventLayers[layer][i];

            const leftPos = calculateHorizPosition(event.startTime);
            const width = calculateWidth(event.duration);
            const bottomPos = (layer * 46).toString() + 'px';
            //create element and add it to view:

            var eventSpan = document.createElement('span');
            eventSpan.className = 'event';
            eventSpan.id = 'event-withID-' + event.title;
            eventSpan.addEventListener('click', function () {
                alert('bring up event editor for ' + eventSpan.id);
            });
            
            eventSpan.style.width = width;
            eventSpan.style.left = leftPos;
            eventSpan.style.bottom = bottomPos;
            eventSpan.style.backgroundColor = "#CCCCCC";
            eventSpan.innerHTML = event.title;

            container.appendChild(eventSpan);
        }
    }
}



