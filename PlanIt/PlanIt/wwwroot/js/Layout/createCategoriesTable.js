function createCategoriesTable(categories) {
    var categoriesTable = '';
    for (var row = 0; row < categories.length; row++) {
        categoriesTable += '<tr class="category-table-row">';
        categoriesTable += '<td class="category-checkbox-entry">'
            + '<input type="checkbox" class="category-checkbox" id="category-checkbox' + row.toString() + '" checked/>'
            + '<label class="category-label" for="category-checkbox' + row.toString() + '"/><span class="category-label-text">' + categories[row] + '</span></label>'
            + '</td>';

        if (row > 0) {
            categoriesTable += '<td>'
                + '<button class="category-edit-button"><span class="far fa-edit"></span></button>'
                + '</td>';
            categoriesTable += '<td>'
                + '<button class="category-delete-button"><span class="far fa-trash-alt"></span></button>'
                + '</td>';
        }
        categoriesTable += '</tr>';

    }
    document.getElementById('categories-table').innerHTML += categoriesTable;
    document.getElementById('toggle-all-categories-input').checked = true;
    document.getElementById('toggle-all-label-text').innerHTML = 'Toggle All Off';

    //JSON.parse('{  "categoryTitles": [' 
    //+ '{ "title" : "General" },'
    //+ '{ "title" : "School" },'
    //+ '{ "title" : "Soccer" },'
    //    + '{ "title" : "Personal" }, ]}')
}