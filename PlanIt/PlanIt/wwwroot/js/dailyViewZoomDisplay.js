function adjustPadding(eventContainer) {
    var paddingWidth = window.getComputedStyle(eventContainer).width;
    paddingWidth = parseInt(paddingWidth);
    paddingWidth *= 0.0080524;
    //add 4 for the margins on the number line
    eventContainer.style.paddingLeft = paddingWidth.toString() + "px";
    eventContainer.style.paddingRight = paddingWidth.toString() + "px";
}

function zoomIn() {
    var eventContainer = document.getElementById('event-container');
    var numberLine = document.getElementById('daily-view-display-img');

    var currentWidth = numberLine.style.width;
    if (currentWidth == '100%') {
        eventContainer.style.width = '125%';
        numberLine.style.width = '125%';
        document.getElementById('zoom-level-text').innerHTML = '125%';
    }
    else if (currentWidth == '125%') {
        eventContainer.style.width = '150%';
        numberLine.style.width = '150%';
        document.getElementById('zoom-level-text').innerHTML = '150%';
    }
    else if (currentWidth == '150%') {
        eventContainer.style.width = '175%';
        numberLine.style.width = '175%';
        document.getElementById('zoom-level-text').innerHTML = '175%';
    }
    else if (currentWidth == '175%') {
        eventContainer.style.width = '200%';
        numberLine.style.width = '200%';
        document.getElementById('zoom-level-text').innerHTML = '200%';
    }

    adjustPadding(eventContainer);
}

function zoomOut() {
    var eventContainer = document.getElementById('event-container');
    var numberLine = document.getElementById('daily-view-display-img');

    var currentWidth = numberLine.style.width;
    if (currentWidth == '200%') {
        eventContainer.style.width = '175%';
        numberLine.style.width = '175%';
        document.getElementById('zoom-level-text').innerHTML = '175%';
    }
    else if (currentWidth == '175%') {
        eventContainer.style.width = '150%';
        numberLine.style.width = '150%';
        document.getElementById('zoom-level-text').innerHTML = '150%';
    }
    else if (currentWidth == '150%') {
        eventContainer.style.width = '125%';
        numberLine.style.width = '125%';
        document.getElementById('zoom-level-text').innerHTML = '125%';
    }
    else if (currentWidth == '125%') {
        eventContainer.style.width = '100%';
        numberLine.style.width = '100%';
        document.getElementById('zoom-level-text').innerHTML = '100%';
    }

    adjustPadding(eventContainer);
}