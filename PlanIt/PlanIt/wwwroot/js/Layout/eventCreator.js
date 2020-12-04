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

<<<<<<< HEAD
        ctgOption.value = ctg.CategoryId + "-" + i.toString();
=======
        ctgOption.value = ctg.Category_Id + "_" + i.toString();
>>>>>>> c7be3804dcdf4daffabe93c74ac39c4c5a527c24
        ctgOption.innerHTML = ctg.Title;
        ctgOption.style.backgroundColor = ctg.Color;
        ctgChooser.appendChild(ctgOption);
    }

}

function initModalInputs_creator() {
    document.getElementById('eventTitle').value = "";
    document.getElementById('eventTime').value = "12:00";
    document.getElementById('eventHours').value = "0";
    document.getElementById('eventMinutes').value = "30";
}

function initSubmitButton_creator() {
    var submitBtn = document.createElement('button');
    submitBtn.id = "btnCreateEvent";
    submitBtn.innerHTML = "Create Event";
    submitBtn.addEventListener('click', function () {
        if (allFormsFilled()) {
            var id_index;
            var title;
            var startDate;
            var hours;
            var minutes;
            var startTime;
            var description;
            $.ajax({
                url: "Calendar/AddEvent",
                type: 'POST',
                data: {
                    ctgId_ctgIndex: id_index,
                    evtTitle: title,
                    evtStartDate: startDate,
                    evtHours: hours, 
                    evtMinutes: minutes,
                    evtStartTimeStr: startTime, 
                    evtDescription: description,
                },
                success: function (result) {
                    alert('event add called');
                    modelJSON = JSON.parse(result);
                    displayEvents(modelJSON, dateToString(currentDisplayedDate));
                };
            });
        }
    });
    document.getElementById('addEvent-submitRow').appendChild(submitBtn);
}

function allFormsFilled() {
    var 
    return true;
}
//END CREATOR CONFIGURATION





//EDITOR CONFIGURATION

function activateEventModal_editor() {
    var modal = document.getElementById("modalAddEvent");
    modal.style.display = "block";
}

function initEventModal_editor(modelJSON, event, eventElementId, eventCtgTitle) {
    setModalLabel('Event Editor');
    setButtonLabel('Edit Event');
    initModalCtgSelect_editor(modelJSON, eventCtgTitle);
    initModalInputs_editor(event);
}



function initModalCtgSelect_editor(modelJSON, eventCtgTitle) {
    clearCtgSelector();
    var ctgChooser = document.getElementById("categories_ev");
    ctgChooser.style.borderRadius = "4px";
    ctgChooser.style.outline = "none";
    for (var i = 0; i < modelJSON.Categories.length; i++) {
        var ctg = modelJSON.Categories[i];

        // Create a new HTML option tag for each category
        var ctgOption = document.createElement('option');

        ctgOption.value = ctg.Title;
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


// When the user selects an option, change the background color to the color of the category
var selectCtg = document.getElementById("categories_ev");
var setBgColor = function (select) {
    select.style.backgroundColor = select.options[select.selectedIndex].style.backgroundColor;
};

selectCtg.onchange = function () {
    setBgColor(this);
};

