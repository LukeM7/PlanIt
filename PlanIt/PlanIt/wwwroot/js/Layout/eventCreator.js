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

// When the user selects an option, change the background color to the color of the category

var selectCtg = document.getElementById("categories_ev");
var setBgColor = function (select) {
    select.style.backgroundColor = select.options[select.selectedIndex].style.backgroundColor;
};

selectCtg.onchange = function () {
    setBgColor(this);
};
var ctgChooser = document.getElementById("categories_ev");
function setBgColor(ctgChooser) {
    ctgChooser.style.backgroundColor = ctgChooser.options[ctgChooser.selectedIndex].style.backgroundColor;
}
ctgChooser.addEventListener('change', function () {
    setBgColor(this);
})



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
    
    ctgChooser.style.borderRadius = "4px";
    ctgChooser.style.outline = "none";
    for (var i = 0; i < modelJSON.Categories.length; i++) {
        var ctg = modelJSON.Categories[i];

        // Create a new HTML option tag for each category
        var ctgOption = document.createElement('option');

        ctgOption.value = ctg.Category_Id + "_" + i.toString();
        ctgOption.innerHTML = ctg.Title;
        ctgOption.style.backgroundColor = ctg.Color;
        ctgChooser.appendChild(ctgOption);
    }
    setBgColor(ctgChooser);

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
        var ctgId = id_index[0];
        var ctgIndex = id_index[1];
        ctgIndex = parseInt(ctgIndex);
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
                    ctg_id: ctgId,
                    ctg_index: ctgIndex,
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

function initEventModal_editor(modelJSON, event, eventIndex, eventCtgIndex) {
    setModalLabel('Event Editor');
    initModalCtgSelect_editor(modelJSON, eventCtgIndex);
    initModalInputs_editor(event);
    var initialCtgIndex = eventCtgIndex;
    initSubmitButton_editor(event, eventIndex, initialCtgIndex);
}



function initModalCtgSelect_editor(modelJSON, eventCtgIndex) {
    clearCtgSelector();
    var ctgChooser = document.getElementById("categories_ev");
    
    ctgChooser.style.borderRadius = "4px";
    ctgChooser.style.outline = "none";
    for (var i = 0; i < modelJSON.Categories.length; i++) {
        var ctg = modelJSON.Categories[i];

        // Create a new HTML option tag for each category
        var ctgOption = document.createElement('option');

        ctgOption.value = i.toString();
        ctgOption.innerHTML = ctg.Title;
        ctgOption.style.backgroundColor = ctg.Color;
        ctgChooser.appendChild(ctgOption);

        //pre-set to event's category 
        if (i == eventCtgIndex) {
            const val = ctgOption.value;
            ctgChooser.value = val;
        }
    }
    setBgColor(ctgChooser);
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


function initSubmitButton_editor(event, eventIndex, initialCtgIndex) {
    var oldSubmitBtn = document.getElementById('btnCreateEvent');
    if (oldSubmitBtn != null) {
        oldSubmitBtn.parentElement.removeChild(oldSubmitBtn);
    }
    var submitBtn = document.createElement('button');
    submitBtn.id = "btnCreateEvent";
    submitBtn.innerHTML = "Save Changes";
    submitBtn.addEventListener('click', function () {
        var eventId = event.Event_Id;
        var newCtgIndex = parseInt(document.getElementById('categories_ev').value);
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
                url: "Calendar/EditEvent",
                type: 'POST',
                data: {
                    evt_id: eventId,
                    evt_index: eventIndex,
                    ctg_index: initialCtgIndex,
                    newCtg_index: newCtgIndex,
                    evtTitle: title,
                    evtStartDate: startDate,
                    evtStartTime: startTimeToFloat,
                    evtDuration: durationFloat,
                    evtDescription: description,
                },
                success: function (result) {
                    modelJSON = JSON.parse(result);
                    //buildCategoriesTable(modelJSON);
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


