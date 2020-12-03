// Get the modal   
var modal = document.getElementById("modalAddEvent");

// Get the button that opens the modal
var btn = document.getElementById("btnAddEvent");

// When the user clicks the button, open the modal
btn.onclick = function () {  
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Initialize the Add Event Modal UI with the user's categories list
function initAddEventModal(modelJSON) {
    var ctgChooser = document.getElementById("categories_ev");
    for (var i = 0; i < modelJSON.Categories.length; i++) {
        var ctg = modelJSON.Categories[i];

        // Create a new HTML option tag for each category
        var ctgOption = document.createElement('option');

        ctgOption.value = ctg.Title;
        ctgOption.innerHTML = ctg.Title;
        ctgOption.style.backgroundColor = ctg.Color;
        ctgChooser.appendChild(ctgOption);
    }
}

