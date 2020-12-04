
function clearCategoriesTable(categoriesTable) {
    while (categoriesTable.firstChild != null) {
        categoriesTable.removeChild(categoriesTable.lastChild);
    }
}


function buildCategoriesTable(modelJSON) {
    var categoriesTable = document.getElementById('categories-table');
    clearCategoriesTable(categoriesTable);
    for (var i = 0; i < modelJSON.Categories.length; i++) {
        var category = modelJSON.Categories[i];

        buildCategoryRow(i, categoriesTable, category);
    }

}

function buildCategoryRow(index, categoriesTable, category) {
    const row = categoriesTable.insertRow(index);
    row.className = 'category-table-row';
    row.id = 'category-table-row' + index.toString();

    const ctgColor = category.Color;
    const ctgTitle = category.Title;
    const ctgUID = category.Category_Id

    var categoryEntry0 = row.insertCell(0);
    categoryEntry0.className = 'category-checkbox-entry';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'category-checkbox';
    checkbox.id = 'category-checkbox' + index.toString();
    checkbox.checked = category.isToggled;

    var label = document.createElement('label');
    label.className = 'category-label';
    label.id = 'category-label' + index.toString();
    label.htmlFor = checkbox.id;
    if (category.isToggled) {
        label.style.backgroundColor = ctgColor;
        label.style.border = "solid 2px " + ctgColor;
    }
    else {
        label.style.backgroundColor = "#cccfd7";
        label.style.border = "solid 2px #bbbfca";
    }

    var labelText = document.createElement('span');
    labelText.id = 'category-label-text' + index.toString();
    labelText.className = 'category-label-text';
    labelText.innerHTML = ctgTitle;
    label.appendChild(labelText);

    categoryEntry0.appendChild(checkbox);
    categoryEntry0.appendChild(label);

    checkbox.addEventListener('change', function () {
        toggleCategory(ctgUID, index, this, label, ctgColor);
    });

    var categoryEntry1 = row.insertCell(1);
    var editBtn = document.createElement('button');
    editBtn.className = 'category-configure-button';
    var editIcon = document.createElement('span');
    editIcon.className = "far fa-edit";

    editBtn.addEventListener('click', function () {
        showCategoryEditorMenu(index, category);
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
            var d = JSON.stringify(ctgUID);
            $.ajax({
                url: '/Calendar/Test',
                type: 'POST',
                data: {
                    data: d,
                    ctg_index: index,
                },
                success: function () {
                    alert('reached test method in controller');
                },
            })
        });

        deleteBtn.appendChild(deleteIcon);
        categoryEntry2.appendChild(deleteBtn);
    }
}



function toggleColorUpdate(isToggled, ctgLabel, color) {
    if (isToggled) {
        ctgLabel.style.backgroundColor = color;
        ctgLabel.style.border = "solid 2px " + color;
    }
    else {
        ctgLabel.style.backgroundColor = "#cccfd7";
        ctgLabel.style.border = "solid 2px #bbbfca";
    }
}

function toggleCategory(ctgUID, index, ctgCheckbox, ctgLabel, color) {
    toggleColorUpdate(ctgCheckbox.checked, ctgLabel, color);
    var id = JSON.stringify(ctgUID);
    $.ajax({
        url: '/Calendar/ToggleCategory',
        type: 'POST',
        data: {
            ctg_id: id,
            ctg_index: index,
        },
        success: function (result) {
            modelJSON = JSON.parse(result);
            displayEvents(modelJSON, dateToString(currentDisplayedDate));
        }
    });
}

function overwriteCategory(index, category) {
    var categoriesTable = document.getElementById('categories-table');
    categoriesTable.deleteRow(index);
    buildCategoryRow(index, categoriesTable, category);
}

//pass in the index of the category from the json list of categories
//pass in the label whose cosmetics will be edited   
function showCategoryEditorMenu(index, category) {
    var menu = document.getElementById('category-editor-menu');
    var ctgFirstRow = document.getElementById('category-table-row0');
    if (menu == null) {
        menu = buildCtgEditorMenu(index, category);
        ctgFirstRow.appendChild(menu);
    }
    else {
        //if menu's parent is not the same
        var title = document.getElementById('ctg-menu-title').innerHTML;
        if (title != ('Edit ' + category.Title) ) {
            menu.parentElement.removeChild(menu);
            menu = buildCtgEditorMenu(index, category);
            ctgFirstRow.appendChild(menu);
        }
        else {
            menu.parentElement.removeChild(menu);
        }
    }
}
function buildCtgEditorMenu(index, category) {
    var menu = document.createElement('span');
    menu.style.border = 'solid 2px ' + category.Color;
    menu.className = 'category-editor-menu';
    menu.id = 'category-editor-menu';
    
    //MENU TITLE AND EXIT BUTTON

    var titleContainer = document.createElement('div');
    titleContainer.className = 'ctg-menu-title-container';
    titleContainer.id = 'ctg-editormenu-title-container';
    titleContainer.style.backgroundColor = category.Color;

        var xButton = document.createElement('input');
        xButton.id = 'ctg-editormenu-exit-btn';
        xButton.className = "ctg-menu-exit-btn";
        xButton.type = 'button';
        xButton.addEventListener('click', function () {
            menu.parentElement.removeChild(menu);
        });

        var xButtonLabel = document.createElement('label');
        xButtonLabel.className = 'ctg-menu-exit-label';
        xButtonLabel.innerHTML = '<span class="fas fa-times"></span>';
        xButtonLabel.htmlFor = xButton.id;

        var menuTitle = document.createElement('span');
        menuTitle.className = 'ctg-menu-title';
        menuTitle.id = 'ctg-menu-title';
        menuTitle.innerHTML = 'Edit ' + category.Title;


    titleContainer.appendChild(xButton);
    titleContainer.appendChild(xButtonLabel);
    titleContainer.appendChild(menuTitle);
    menu.appendChild(titleContainer);


    //MENU EDITING OPTIONS 
    var editingClrContainer = document.createElement('div');
    editingClrContainer.className = 'ctg-menu-editing-container';

        var colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.id = 'ctg-editormenu-color-input';
        colorInput.className = 'ctg-menu-input';
        colorInput.value = category.Color;
        colorInput.addEventListener('change', function () {
            const clr = this.value;
            var title = document.getElementById('ctg-editormenu-title-container');
            title.style.backgroundColor = clr;
            var ctgMenu = document.getElementById('category-editor-menu');
            ctgMenu.style.border = 'solid 2px ' + clr;
        });

    editingClrContainer.appendChild(colorInput);
    menu.appendChild(editingClrContainer);

    if (index > 0) {
        var editingTitleContainer = document.createElement('div');
        editingTitleContainer.className = 'ctg-menu-editing-container';
            var titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.maxLength = '12';
            titleInput.id = 'ctg-editormenu-title-input';
            titleInput.className = 'ctg-menu-input';
            titleInput.value = category.Title;

        editingTitleContainer.appendChild(titleInput);
        menu.appendChild(editingTitleContainer);
    }

    //MENU SAVE BUTTON (WHERE EDIT CATEGORY IS CALLED)
    var saveContainer = document.createElement('div');
    saveContainer.id = 'ctg-menu-save-container';

        var saveButton = document.createElement('input');
        saveButton.type = 'button';
        saveButton.id = 'ctg-editormenu-save-btn';
        saveButton.value = 'Save Changes';
        saveButton.addEventListener('click', function () {
            var ctgTitle;
            //since General category title can't be edited

            if (index > 0) {
                ctgTitle = document.getElementById('ctg-editormenu-title-input').value;
            }
            else {
                ctgTitle = 'General';
            }

            const ind = index;
            //grab the color from the color input  
            const ctgColor = document.getElementById('ctg-editormenu-color-input').value;
            const ctgUID = category.Category_Id;
            $.ajax({
                //url: '/Controller/Action'
                url: '/Calendar/EditCategory',
                type: 'POST',
                data: {
                    ctg_id: ctgUID,
                    ctg_index: ind,
                    ctgTitle: ctgTitle,
                    ctgColor: ctgColor,
                },
                success: function (result) {
                    var modelJSON = JSON.parse(result);
                    overwriteCategory(index, modelJSON.Categories[index]);
                    displayEvents(modelJSON, dateToString(currentDisplayedDate));
                },
            });
        });

    saveContainer.appendChild(saveButton);
    menu.appendChild(saveContainer);

    return menu;
}


//toggleSource must be a checkbox

function toggleAllCategories(modelJSON) {
    var togglerAll = document.getElementById('toggle-all-categories-input');
    const toggleValue = togglerAll.checked;
    togglerAll = !toggleValue;

    $.ajax({
        url: '/Calendar/ToggleAllCategories',
        type: 'POST',
        data: {
            toggleValue: toggleValue,
        },
        success: function (result) {
            modelJSON = JSON.parse(result);
            //update colors for all categories
            for (var i = 0; i < modelJSON.Categories.length; i++) {
                document.getElementById('category-checkbox' + i.toString()).checked = toggleValue;
                var ctgColor = modelJSON.Categories[i].Color;
                var ctgLabel = document.getElementById('category-label' + i.toString());
                toggleColorUpdate(toggleValue, ctgLabel, ctgColor);
            }
            displayEvents(modelJSON, dateToString(currentDisplayedDate));
        }
    });
    if (toggleValue == true) {
        document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All Off';
    }
    else {
        document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All On';
    }
}

