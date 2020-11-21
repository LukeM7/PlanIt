var categoryTitles = ["General", "School", "Soccer", "Personal", "this is a test"];
var categoriesTable = '';
for (var row = 0; row < categoryTitles.length; row++) {
    categoriesTable += '<tr>';
    categoriesTable += '<td class="category-toggle-entry">'
        + '<input type="checkbox" value="None" class="category-toggle" id="category-toggle' + row.toString() + '"/>'
        + '<label class="category-label" for="category-toggle' + row.toString() + '"/>' + categoryTitles[row] + '</label>'
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




