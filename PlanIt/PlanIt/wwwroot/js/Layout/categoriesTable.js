//these functions are used in _layoutInit.js
//and may be called via interaction later

function buildCategoriesTable(categoriesJSON) {
    var categoriesTable = document.getElementById('categories-table');
    for (var i = 0; i < categoriesJSON.categories.length; i++) {
        var category = categoriesJSON.categories[i];

        buildCategoryRow(i, categoriesTable, category.title, category.color);
    }
}

function buildCategoryRow(index, categoriesTable, ctgTitle, ctgColor) {
    const row = categoriesTable.insertRow(index);
    row.className = 'category-table-row';
    row.id = 'category-table-row' + index.toString();

    var categoryEntry0 = row.insertCell(0);
    categoryEntry0.className = 'category-checkbox-entry';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'category-checkbox';
    checkbox.id = 'category-checkbox' + index.toString();
    checkbox.checked = true;

    var label = document.createElement('label');
    label.className = 'category-label';
    label.id = 'category-label' + index.toString();
    label.htmlFor = checkbox.id;
    label.style.backgroundColor = ctgColor;
    label.style.border = "solid 2px " + ctgColor;

    var labelText = document.createElement('span');
    labelText.id = 'category-label-text' + index.toString();
    labelText.className = 'category-label-text';
    labelText.innerHTML = ctgTitle;
    label.appendChild(labelText);

    categoryEntry0.appendChild(checkbox);
    categoryEntry0.appendChild(label);

    checkbox.addEventListener('change', function () {
        toggleCategory(this, label, ctgColor);
    });

    var categoryEntry1 = row.insertCell(1);
    var editBtn = document.createElement('button');
    editBtn.className = 'category-configure-button';
    var editIcon = document.createElement('span');
    editIcon.className = "far fa-edit";

    editBtn.addEventListener('click', function () {
        showCategoryEditMenu(index, ctgTitle, ctgColor);
    });

    editBtn.appendChild(editIcon);
    categoryEntry1.appendChild(editBtn);

    if (index > 0) {
        var categoryEntry2 = row.insertCell(2);
        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'category-configure-button';
        var deleteIcon = document.createElement('span');
        deleteIcon.className = "far fa-trash-alt";
        deleteBtn.addEventListener('click', function () {
            alert('delete category from model and rebuild table');
        });

        deleteBtn.appendChild(deleteIcon);
        categoryEntry2.appendChild(deleteBtn);
    }
}


function toggleCategory(ctgCheckbox, ctgLabel, color) {
    alert('call event display function to toggle event display once categories and events are properly connected');
    if (ctgCheckbox.checked) {
        ctgLabel.style.backgroundColor = color;
        ctgLabel.style.border = "solid 2px " + color;
    }
    else {
        ctgLabel.style.backgroundColor = "#cccfd7";
        ctgLabel.style.border = "solid 2px #bbbfca";
    }
}

function updateCategory(index, newTitle, newColor) {
    var categoriesTable = document.getElementById('categories-table');
    categoriesTable.deleteRow(index);
    buildCategoryRow(index, categoriesTable, newTitle, newColor);
}

//pass in the index of the category from the json list of categories
//pass in the label whose cosmetics will be edited   
function showCategoryEditMenu(index, ctgTitle, ctgColor) {
    var ctgRow = document.getElementById('category-table-row' + index.toString())
    var menu = document.getElementById('edit-category-menu');
    
    if (menu == null) {
        menu = buildEditMenu(index, ctgTitle, ctgColor);
        ctgRow.appendChild(menu);
    }
    else {
        //if menu's parent is not the same
        if (menu.parentElement.id != ctgRow.id) {
            menu.parentElement.removeChild(menu);
            menu = buildEditMenu(index, ctgTitle, ctgColor);
            ctgRow.appendChild(menu);
        }
        else {
            menu.parentElement.removeChild(menu);
        }
    }
}
function buildEditMenu(index, ctgTitle, ctgColor) {
    var menu = document.createElement('span');
    menu.style.border = 'solid 2px ' + ctgColor;
    menu.id = 'edit-category-menu';

    
    //MENU TITLE AND EXIT BUTTON 
    var titleContainer = document.createElement('div');
    titleContainer.id = 'edit-ctg-menu-title-container';
    titleContainer.style.backgroundColor = ctgColor;

        var xButton = document.createElement('input');
        xButton.id = 'edit-ctg-menu-exit-btn';
        xButton.type = 'button';
        xButton.addEventListener('click', function () {
            menu.parentElement.removeChild(menu);
        });

        var xButtonLabel = document.createElement('label');
        xButtonLabel.id = 'edit-ctg-menu-exit-label';
        xButtonLabel.innerHTML = '<span class="fas fa-times"></span>';
        xButtonLabel.htmlFor = xButton.id;

        var menuTitle = document.createElement('span');
        menuTitle.id = 'edit-ctg-menu-title';
        menuTitle.innerHTML = 'Edit ' + ctgTitle;


    titleContainer.appendChild(xButton);
    titleContainer.appendChild(xButtonLabel);
    titleContainer.appendChild(menuTitle);
    menu.appendChild(titleContainer);


    //MENU EDITING OPTIONS 
    var editingClrContainer = document.createElement('div');
    editingClrContainer.className = 'edit-ctg-menu-editing-container';

        var colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.id = 'edit-ctg-menu-color-input';
        colorInput.className = 'edit-ctg-menu-input';
        colorInput.value = ctgColor;
        colorInput.addEventListener('change', function () {
            const clr = this.value.toString();
            var title = document.getElementById('edit-ctg-menu-title-container');
            title.style.backgroundColor = clr;
            var menu = document.getElementById('edit-category-menu');
            menu.style.border = 'solid 2px ' + clr;
        });

    editingClrContainer.appendChild(colorInput);
    menu.appendChild(editingClrContainer);

    if (index > 0) {
        var editingTitleContainer = document.createElement('div');
        editingTitleContainer.className = 'edit-ctg-menu-editing-container';
            var titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.id = 'edit-ctg-menu-title-input';
            titleInput.className = 'edit-ctg-menu-input';
            titleInput.value = ctgTitle;

        editingTitleContainer.appendChild(titleInput);
        menu.appendChild(editingTitleContainer);
    }

    //MENU SAVE BUTTON 
    var saveContainer = document.createElement('div');
    saveContainer.id = 'edit-ctg-menu-save-container';

        var saveButton = document.createElement('input');
        saveButton.type = 'button';
        saveButton.id = 'edit-ctg-menu-save-btn';
        saveButton.value = 'Save Changes';
        saveButton.addEventListener('click', function () {
            alert('write to model the new category values, also call an update to the events UI');

            var newTitle;
            if (index == 0) {
                newTitle = 'General';
            }
            else {
                newTitle = document.getElementById('edit-ctg-menu-title-input').value;
            }
            const newColor = document.getElementById('edit-ctg-menu-color-input').value;
            updateCategory(index, newTitle, newColor);
        });

    saveContainer.appendChild(saveButton);
    menu.appendChild(saveContainer);

    return menu;
}

//toggleSource must be a checkbox

function toggleAllCategories(toggleSource, categoriesJSON) {
    for (var i = 0; i < categoriesJSON.categories.length; i++) {
        const ctgCheckbox = document.getElementById('category-checkbox' + i.toString());
        ctgCheckbox.checked = toggleSource.checked;
        const ctgLabel = document.getElementById('category-label' + i.toString());
        const ctgColor = categoriesJSON.categories[i].color;
        toggleCategory(ctgCheckbox, ctgLabel, ctgColor);
    }

    if (toggleSource.checked == true) {
        document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All Off';
    }
    else {
        document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All On';
    }
}

