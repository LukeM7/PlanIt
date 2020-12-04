// Get the modal   
var modal = document.getElementById("modalAddEvent");

// Get the button that opens the modal  
var btn = document.getElementById("btnAddEvent");

// When the user clicks the button, open the modal
btn.onclick = function () {
    var modelJSON;
    $.ajax({
        url: '/Calendar/GetModelJSON',
        type: 'GET',
        success: function (result) {
            modelJSON = JSON.parse(result);
            initEventModal_creator(modelJSON);
            modal.style.display = "block";
        },
    });
}

// When the user clicks anywhere outside of the modal, close it

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function clearCtgSelector() {
    var selector = document.getElementById("categories_ev");

    while (selector.firstChild != null) {
        selector.removeChild(selector.lastChild);
    }
}
function allFormsFilled(title, startDate, hours, minutes, startTime) {
    //alert(title + ", " + startDate + ", " + startTime + ", " + hours + ", " + minutes);

    return !((title == "" || typeof title == 'undefined') ||
        (startDate == "" || typeof startDate == 'undefined') ||
        (hours == "" || typeof hours == 'undefined') ||
        (minutes == "" || typeof minutes == 'undefined') ||
        (startTime == "" || typeof startTime == 'undefined'));
}

//CREATOR CONFIGURATION
function initEventModal_creator(modelJSON) {
    setModalLabel('Event Creator');
    initModalCtgSelect_creator(modelJSON);
    initModalInputs_creator();
    initSubmitButton_creator();
}


function setModalLabel(title) {
    document.getElementById('eventModalLabel').innerHTML = title;
}


// Initialize the Add Event Modal UI with the user's categories list

function initModalCtgSelect_creator(modelJSON) {
    clearCtgSelector();
    var ctgChooser = document.getElementById("categories_ev");
    for (var i = 0; i < modelJSON.Categories.length; i++) {
        var ctg = modelJSON.Categories[i];

        // Create a new HTML option tag for each category
        var ctgOption = document.createElement('option');

        ctgOption.value = ctg.Category_Id + "_" + i.toString();
        ctgOption.innerHTML = ctg.Title;
        ctgOption.style.backgroundColor = ctg.Color;
        ctgChooser.appendChild(ctgOption);
    }

}

function initModalInputs_creator() {
    document.getElementById('eventTitle').value = "";
    document.getElementById('eventTime').value = "12:00";
    document.getElementById('eventHours').value = "1";
    document.getElementById('eventMinutes').value = "0";
    document.getElementById('eventDate').value = dateToString(currentDisplayedDate);
    document.getElementById('eventDescription').value = "";
}

function initSubmitButton_creator() {
    var oldSubmitBtn = document.getElementById('btnCreateEvent');
    if (oldSubmitBtn != null) {
        oldSubmitBtn.parentElement.removeChild(oldSubmitBtn);
    }
    var submitBtn = document.createElement('button');
    submitBtn.id = "btnCreateEvent";
    submitBtn.innerHTML = "Create Event";
    submitBtn.addEventListener('click', function () {
        var id_index = document.getElementById('categories_ev').value.split('_');
        var id = id_index[0];
        var index = id_index[1];
        index = parseInt(index);
        var title = document.getElementById('eventTitle').value;
        var startDate = document.getElementById('eventDate').value;
        var startTime = document.getElementById('eventTime').value;
        var hours = document.getElementById('eventHours').value;
        var minutes = document.getElementById('eventMinutes').value;
        var description = document.getElementById('eventDescription').value;

        if (allFormsFilled(title, startDate, hours, minutes, startTime)) {
            startTime = startTime.split(':');
            var startTimeToFloat = parseFloat(startTime[0]) + (parseFloat(startTime[1]) / 60);
            var durationFloat = parseFloat(hours) + (parseFloat(minutes) / 60);
            $.ajax({
                url: "Calendar/AddEvent",
                type: 'POST',
                data: {
                    ctg_id: id,
                    ctg_index: index,
                    evtTitle: title,
                    evtStartDate: startDate,
                    evtStartTime: startTimeToFloat,
                    evtDuration: durationFloat,
                    evtDescription: description,
                },
                success: function (result) {
                    modelJSON = JSON.parse(result);
                    displayEvents(modelJSON, dateToString(currentDisplayedDate));
                    submitBtn.parentElement.removeChild(submitBtn);
                    modal.style.display = "none";
                },
            });
        }
        else {
            alert('Event creation is incomplete!');
        }
    });
    document.getElementById('addEvent-submitRow').appendChild(submitBtn);
}


//END CREATOR CONFIGURATION





//EDITOR CONFIGURATION

function activateEventModal_editor() {
    var modal = document.getElementById("modalAddEvent");
    modal.style.display = "block";
}

function initEventModal_editor(modelJSON, event, eventElementId, eventCtgTitle) {
    setModalLabel('Event Editor');
    initModalCtgSelect_editor(modelJSON, eventCtgTitle);
    initModalInputs_editor(event);
    initSubmitButton_editor(event);
}



function initModalCtgSelect_editor(modelJSON, eventCtgTitle) {
    clearCtgSelector();
    var ctgChooser = document.getElementById("categories_ev");
    for (var i = 0; i < modelJSON.Categories.length; i++) {
        var ctg = modelJSON.Categories[i];

        // Create a new HTML option tag for each category
        var ctgOption = document.createElement('option');

        ctgOption.value = i.toString();
        ctgOption.innerHTML = ctg.Title;
        ctgOption.style.backgroundColor = ctg.Color;
        ctgChooser.appendChild(ctgOption);

        //pre-set to event's category 
        if (eventCtgTitle == ctgOption.innerHTML) {
            const val = ctgOption.value;
            ctgChooser.value = val;
        }
    }
}

function initModalInputs_editor(event) {
    document.getElementById('eventTitle').value = event.Title;
    if (typeof event.Description != 'undefined') {
        document.getElementById('eventDescription').value = event.Description;
    }

    //start time:

    var startHour = Math.floor(event.StartTime);
    if (startHour < 10) {
        startHour = startHour.toString();
        startHour = "0" + startHour;
    }
    else {
        startHour = startHour.toString();
    }
    var startMinutes = Math.floor((event.StartTime - startHour) * 60);
    if (startMinutes < 10) {
        startMinutes = startMinutes.toString();
        startMinutes = "0" + startMinutes;
    }
    else {
        startMinutes = startMinutes.toString();
    }
    var startTime = startHour + ":" + startMinutes;
    document.getElementById('eventTime').value = startTime;

    //duration:

    var durationHours = Math.floor(event.Duration);
    var durationMinutes = Math.floor((event.Duration - durationHours) * 60);
    document.getElementById('eventHours').value = durationHours;
    document.getElementById('eventMinutes').value = durationMinutes;

    

    //start date:

    document.getElementById('eventDate').value = event.StartDate;
}


function initSubmitButton_editor(event) {
    var oldSubmitBtn = document.getElementById('btnCreateEvent');
    if (oldSubmitBtn != null) {
        oldSubmitBtn.parentElement.removeChild(oldSubmitBtn);
    }
    var submitBtn = document.createElement('button');
    submitBtn.id = "btnCreateEvent";
    submitBtn.innerHTML = "Save Changes";
    submitBtn.addEventListener('click', function () {
        var eventId = event.Event_Id;
        var eventIndex = 2;
        var index = document.getElementById('categories_ev').value.parseInt(index);
        alert('ctg index: ' + index);
        var title = document.getElementById('eventTitle').value;
        alert('title: ' + title)
        var startDate = document.getElementById('eventDate').value;
        alert('startDate: ' + startDate)
        var startTime = document.getElementById('eventTime').value;
        alert('startTime: ' + startTime)
        var hours = document.getElementById('eventHours').value;
        alert('hours: ' + hours)
        var minutes = document.getElementById('eventMinutes').value;
        alert('minutes: ' + minutes)
        var description = document.getElementById('eventDescription').value;
        alert('description: ' + description)

        if (allFormsFilled(title, startDate, hours, minutes, startTime)) {
            startTime = startTime.split(':');
            var startTimeToFloat = parseFloat(startTime[0]) + (parseFloat(startTime[1]) / 60);
            var durationFloat = parseFloat(hours) + (parseFloat(minutes) / 60);
            $.ajax({
                url: "Calendar/EditEvent",
                type: 'POST',
                data: {
                    evt_id: eventId,
                    evt_index: eventIndex,
                    ctg_index: index,
                    evtTitle: title,
                    evtStartDate: startDate,
                    evtStartTime: startTimeToFloat,
                    evtDuration: durationFloat,
                    evtDescription: description,
                },
                success: function (result) {
                    modelJSON = JSON.parse(result);
                    displayEvents(modelJSON, dateToString(currentDisplayedDate));
                    submitBtn.parentElement.removeChild(submitBtn);
                    modal.style.display = "none";
                },
            });
        }
        else {
            alert('Event creation is incomplete!');
        }
    });
    document.getElementById('addEvent-submitRow').appendChild(submitBtn);
}


