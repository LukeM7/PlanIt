var categoryTitles = ["General", "School", "Soccer", "Personal", "A", "B", "C", " D", "E", "F", "G", "AA", "AB", "AC", "AD", "AE", "AF", "AG"];
var categoriesTable = '';
for (var row = 0; row < categoryTitles.length; row++) {
    categoriesTable += '<tr class="category-table-row">';
    categoriesTable += '<td class="category-checkbox-entry">'
        + '<input type="checkbox" class="category-checkbox" id="category-checkbox' + row.toString() + '"/>'
        + '<label class="category-label" for="category-checkbox' + row.toString() + '"/><span class="category-label-text">' + categoryTitles[row] + '</span></label>'
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
document.getElementById("categories-table").innerHTML += categoriesTable;


    //JSON.parse('{  "categoryTitles": [' 
    //+ '{ "title" : "General" },'
    //+ '{ "title" : "School" },'
    //+ '{ "title" : "Soccer" },'
    //    + '{ "title" : "Personal" }, ]}')




