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
        //alert('comparing: (' + eventStart.toString() + ', ' + eventEnd.toString()
        //    + ') to (' + ithStart.toString() + ', ' + ithEnd.toString() + ')');
        if (doesOverlap(eventStart, eventEnd, ithStart, ithEnd)) {
            return false;
        }
    }
    return true;
}


function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function generateColoredStructure(events, eventCtgTitlesColors) {
    var numEvents = events.length;
    if (numEvents <= 0) {
        return;
    }
    var layers = [[events[0]]];
    var evtInds_titles_colors_ctgInds = [[eventCtgTitlesColors[0]]];
    for (var i = 1; i < events.length; i++) {
        
        var evt = events[i];
        var evtClr = eventCtgTitlesColors[i]
        const eventStart = evt.StartTime;
        const eventEnd = eventStart + (evt.Duration);
        for (var layer = 0; layer < layers.length; layer++) {
            if (layerIsOpen(eventStart, eventEnd, layers[layer])) {
                layers[layer].push(evt);
                evtInds_titles_colors_ctgInds[layer].push(evtClr);
                break;
            }
            else {
                if (layer == layers.length - 1) {
                    layers.push([evt]);
                    evtInds_titles_colors_ctgInds.push([evtClr]);
                    break;
                }
            }
        }
    }

    return {
        layers,
        evtInds_titles_colors_ctgInds
    };
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
    var eventInd_ctgTitle_ctgColors_ctgInd = [];
    for (var i = 0; i < modelJSON.Categories.length; i++) {
        var ctg = modelJSON.Categories[i];
        if (ctg.isToggled) {
            for (j = 0; j < ctg.Events.length; j++) {
                if (ctg.Events[j].StartDate == forDate) {
                    eventsOnDate.push(ctg.Events[j]);
                    eventInd_ctgTitle_ctgColors_ctgInd.push(j.toString() + "_" + ctg.Title + "_" + ctg.Color + "_" + i.toString());
                }
            }
        }
    }
    if (eventsOnDate.length > 0) {
        var counter = 0;
        var eventLayers = generateColoredStructure(eventsOnDate, eventInd_ctgTitle_ctgColors_ctgInd);
        for (var layer = 0; layer < eventLayers.layers.length; layer++) {
            for (var i = 0; i < eventLayers.layers[layer].length; i++) {

                const event = eventLayers.layers[layer][i];
                const evtInd_title_color_ctgInd = eventLayers.evtInds_titles_colors_ctgInds[layer][i].split("_");
                const evtIndex = parseInt(evtInd_title_color_ctgInd[0]);
                const ctgTitle = evtInd_title_color_ctgInd[1];
                const color = evtInd_title_color_ctgInd[2];
                const ctgIndex = parseInt(evtInd_title_color_ctgInd[3]);

                var eventSpan = document.createElement('span');
                eventSpan.className = 'event';
                eventSpan.id = 'event-' + event.Title + "-" + counter.toString();

                //add title 
                var titleSpan = document.createElement('span');
                titleSpan.innerHTML = event.Title;
                titleSpan.className = 'event-title';
                titleSpan.addEventListener('click', function () {
                    initEventModal_editor(modelJSON, event, evtIndex, ctgIndex);
                    activateEventModal_editor();
                });
                eventSpan.appendChild(titleSpan);

                eventSpan.style.width = calculateWidth(event.Duration);
                eventSpan.style.left = calculateHorizPosition(event.StartTime);
                eventSpan.style.bottom = (layer * 43).toString() + 'px';
                eventSpan.style.backgroundColor = color;
                addDeleteBtn(eventSpan, event.Event_Id, evtIndex, ctgIndex);
                container.appendChild(eventSpan);

                counter++;
            }
        }
    }
    
}

function addDeleteBtn(eventSpan, evtId, evtIndex, ctgIndex) {
    var deleteBtn = document.createElement('button');
    deleteBtn.id = 'event-delete-button';
    var deleteIcon = document.createElement('span');
    deleteIcon.className = "far fa-trash-alt";
    deleteBtn.addEventListener('click', function () {
        $.ajax({
            url: '/Calendar/DeleteEvent',
            type: 'POST',
            data: {
                ctg_index: ctgIndex,
                evt_id: evtId,
                evt_index: evtIndex,
            },
            success: function (result) {
                alert('delete success');
                modelJSON = JSON.parse(result);
                displayEvents(modelJSON, dateToString(currentDisplayedDate));
            },
        });
    });
    deleteBtn.appendChild(deleteIcon);
    eventSpan.appendChild(deleteBtn);
}


