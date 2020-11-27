//these functions are used in _layoutInit.js
//and may be called via interaction later

function buildCategoriesTable(categoriesJSON) {
    var categoriesTable = document.getElementById('categories-table');
    for (var i = 0; i < categoriesJSON.categories.length; i++) {
        var category = categoriesJSON.categories[i];
        var row = categoriesTable.insertRow(i);
        row.className = 'category-table-row';
        var categoryEntry0 = row.insertCell(0);
        categoryEntry0.className = 'category-checkbox-entry';
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'category-checkbox';
        checkbox.id = 'category-checkbox' + i.toString();
        checkbox.checked = true;
        
        var label = document.createElement('label');
        label.className = 'category-label';
        label.id = 'category-label' + i.toString();
        label.htmlFor = checkbox.id;
        label.style.backgroundColor = category.color;
        var labelText = document.createElement('span');
        labelText.className = 'category-label-text';
        labelText.innerHTML = category.title;
        label.appendChild(labelText);
        categoryEntry0.appendChild(checkbox);
        categoryEntry0.appendChild(label);

        //these have to be const, for reasons I don't truly understand...  
        const clr = category`.color;
        const lbl = label;
        checkbox.addEventListener('change', function () {
            updateCategory(this, lbl, clr);
        });

        if (i > 0) {
            var categoryEntry1 = row.insertCell(1);
            var editBtn = document.createElement('button');
            editBtn.className = 'category-configure-button';
            var editIcon = document.createElement('span');
            editIcon.className = "far fa-edit";
            editBtn.appendChild(editIcon);
            categoryEntry1.appendChild(editBtn);

            var categoryEntry2 = row.insertCell(2);
            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'category-configure-button';
            var deleteIcon = document.createElement('span');
            deleteIcon.className = "far fa-trash-alt";
            deleteBtn.appendChild(deleteIcon);
            categoryEntry2.appendChild(deleteBtn);
        }
        
    }
}

function updateCategory(ctgCheckbox, ctgLabel, ctgColor) {
    if (ctgCheckbox.checked) {
        ctgLabel.style.backgroundColor = ctgColor;
        ctgLabel.style.border = "solid 2px black";
    }
    else {
        ctgLabel.style.backgroundColor = "#cccfd7";
        ctgLabel.style.border = "solid 2px #bbbfca";
    }
}

//toggleSource must be a checkbox
function toggleAllCategories(toggleSource, categoriesJSON) {
    for (var i = 0; i < categoriesJSON.categories.length; i++) {
        const ctgCheckbox = document.getElementById('category-checkbox' + i.toString());
        ctgCheckbox.checked = toggleSource.checked;
        const ctgLabel = document.getElementById('category-label' + i.toString());
        const ctgColor = categoriesJSON.categories[i].color;
        updateCategory(ctgCheckbox, ctgLabel, ctgColor);
    }

    if (toggleSource.checked == true) {
        document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All Off';
    }
    else {
        document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All On';
    }
}

