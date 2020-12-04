function buildAddCategoryMenu() {
    var menu = document.createElement('span');
    menu.id = 'category-creator-menu';
    menu.className = 'category-creator-menu';
    menu.style.top = "40px";

    //MENU TITLE AND EXIT BUTTON

    var titleContainer = document.createElement('div');
    titleContainer.className = 'ctg-menu-title-container';
    titleContainer.id = 'ctg-creatormenu-title-container';
    titleContainer.style.backgroundColor = '#e8e8e8';

    var xButton = document.createElement('input');
    xButton.id = 'ctg-creatormenu-exit-btn';
    xButton.className = 'ctg-menu-exit-btn';
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
    menuTitle.innerHTML = 'Add New Category';

    titleContainer.appendChild(xButton);
    titleContainer.appendChild(xButtonLabel);
    titleContainer.appendChild(menuTitle);
    menu.appendChild(titleContainer);


    //MENU EDITING OPTIONS 
    var editingClrContainer = document.createElement('div');
    editingClrContainer.className = 'ctg-menu-editing-container';

    var colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.id = 'ctg-creatormenu-color-input';
    colorInput.className = 'ctg-menu-input';
    colorInput.value = '#495464';
    colorInput.addEventListener('change', function () {
        const clr = this.value;
        var title = document.getElementById('ctg-creatormenu-title-container');
        title.style.backgroundColor = clr;
        var ctgMenu = document.getElementById('category-creator-menu');
        ctgMenu.style.border = 'solid 2px ' + clr;
    });

    editingClrContainer.appendChild(colorInput);
    menu.appendChild(editingClrContainer);

    var editingTitleContainer = document.createElement('div');
    editingTitleContainer.className = 'ctg-menu-editing-container';
    var titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.maxLength = '12';
    titleInput.id = 'ctg-creatormenu-title-input';
    titleInput.className = 'ctg-menu-input';
    titleInput.placeholder = 'Enter a title';

    editingTitleContainer.appendChild(titleInput);
    menu.appendChild(editingTitleContainer);

    //MENU SAVE BUTTON (WHERE EDIT CATEGORY IS CALLED)
    var saveContainer = document.createElement('div');
    saveContainer.className = 'ctg-menu-save-container';

    var saveButton = document.createElement('input');
    saveButton.type = 'button';
    saveButton.id = 'ctg-creatormenu-save-btn';
    saveButton.value = 'Create Category';
    saveButton.addEventListener('click', function () {
        const ctgTitle = document.getElementById('ctg-creatormenu-title-input').value;
        const ctgColor = document.getElementById('ctg-creatormenu-color-input').value;
        $.ajax({
            //url: '/Controller/Action'
            url: '/Calendar/AddCategory',
            type: 'POST',
            data: {
                ctgTitle: ctgTitle,
                ctgColor: ctgColor,
            },
            success: function (result) {
                var modelJSON = JSON.parse(result);
                buildCategoriesTable(modelJSON);
                displayEvents(modelJSON, dateToString(currentDisplayedDate));
                menu.parentElement.removeChild(menu);
            },
        });
    });

    saveContainer.appendChild(saveButton);
    menu.appendChild(saveContainer);

    return menu;
}