//this keeps eventContainer perfectly aligned with numberline
//important because the text offsets the position of the numberline by a little 
function adjustPadding(eventPaddedContainer) {
    var paddingWidth = parseFloat(window.getComputedStyle(eventPaddedContainer).width);
    //hard-coded value from the timeline image: (length of text offset)/(total length): 
    paddingWidth *= 0.0080524;
    eventPaddedContainer.style.paddingLeft = paddingWidth.toString() + "px";
    eventPaddedContainer.style.paddingRight = paddingWidth.toString() + "px";
}

function zoomIn() {
    var eventPaddedContainer = document.getElementById('event-padded-outer-container');
    var numberLine = document.getElementById('timeline-img');

    var currentWidth = numberLine.style.width;
    if (currentWidth == '100%') {
        eventPaddedContainer.style.width = '125%';
        numberLine.style.width = '125%';
        document.getElementById('zoom-level-text').innerHTML = '125%';
    }
    else if (currentWidth == '125%') {
        eventPaddedContainer.style.width = '150%';
        numberLine.style.width = '150%';
        document.getElementById('zoom-level-text').innerHTML = '150%';
    }
    else if (currentWidth == '150%') {
        eventPaddedContainer.style.width = '175%';
        numberLine.style.width = '175%';
        document.getElementById('zoom-level-text').innerHTML = '175%';
    }
    else if (currentWidth == '175%') {
        eventPaddedContainer.style.width = '200%';
        numberLine.style.width = '200%';
        document.getElementById('zoom-level-text').innerHTML = '200%';
    }

    adjustPadding(eventPaddedContainer);
}

function zoomOut() {
    var eventPaddedContainer = document.getElementById('event-padded-outer-container');
    var numberLine = document.getElementById('timeline-img');

    var currentWidth = numberLine.style.width;
    if (currentWidth == '200%') {
        eventPaddedContainer.style.width = '175%';
        numberLine.style.width = '175%';
        document.getElementById('zoom-level-text').innerHTML = '175%';
    }
    else if (currentWidth == '175%') {
        eventPaddedContainer.style.width = '150%';
        numberLine.style.width = '150%';
        document.getElementById('zoom-level-text').innerHTML = '150%';
    }
    else if (currentWidth == '150%') {
        eventPaddedContainer.style.width = '125%';
        numberLine.style.width = '125%';
        document.getElementById('zoom-level-text').innerHTML = '125%';
    }
    else if (currentWidth == '125%') {
        eventPaddedContainer.style.width = '100%';
        numberLine.style.width = '100%';
        document.getElementById('zoom-level-text').innerHTML = '100%';
    }

    adjustPadding(eventPaddedContainer);
}