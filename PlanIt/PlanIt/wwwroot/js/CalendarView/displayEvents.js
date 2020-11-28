//idea: title, duration, start time, color, date, category
//will be passed in as a JSON.
//here I'm using a simple array rather than a JSON, and
//I'm not including color, date, or cateogory yet for simplicity.

//this function will be called upon loading the page, any time
//an event is added or deleted, or when a category is toggled.
//It's basically an update() function which pulls from the model


function calculateHorizPosition(startingHour) {
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

function doesOverlap(startA, endA, startB, endB) {
    if ((startB < startA && startA < endB) || (startA < startB && startB < endA)) {
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
        const ithStart = eventsOnLayer[i].startingHour;
        const ithEnd = ithStart + (eventsOnLayer[i].duration / 60);
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
//        const eventStart = events[i].startingHour;
//        const eventEnd = eventStart + (events[i].duration / 60);
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
function calculateOverlaps(events) {
    if (events.length <= 0) {
        return;
    }
    var layers = [[events[0]]];
    for (var i = 1; i < events.length; i++) {
        const eventStart = events[i].startingHour;
        const eventEnd = eventStart + (events[i].duration / 60);
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

function displayEvents(eventsJSON, forDate) {
    var container = document.getElementById('event-inner-container');
    //create a new array of events only out of those included for a given date
    //if (event.date == forDate) {}

    //instead of passing in whole JSON, replace with array of events on given date: 
    var eventLayers = calculateOverlaps(eventsJSON.events);
    for (var layer = 0; layer < eventLayers.length; layer++) {
        for (var i = 0; i < eventLayers[layer].length; i++) {
            const event = eventLayers[layer][i];
            

            const leftPos = calculateHorizPosition(event.startingHour);
            const width = calculateWidth(event.duration);
            const bottomPos = (layer * 12).toString() + '%';
            //create element and add it to view:

            var eventSpan = document.createElement('span');
            eventSpan.className = 'event';
            eventSpan.style.width = width;
            eventSpan.style.left = leftPos;
            eventSpan.style.bottom = bottomPos;
            eventSpan.style.backgroundColor = event.color;
            eventSpan.innerHTML = event.title;
            container.appendChild(eventSpan);
        }
    }
}



