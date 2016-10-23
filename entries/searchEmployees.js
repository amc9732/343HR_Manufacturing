/**
 * displayEmployees entry file
 *
 * This is the file that is loaded into the browser
 * when a user navigates to the loggedIn page
 *
 */

 
 $("#searchEmployees").click(function(e) {
	 var searchTextvalue = document.getElementById("searchText").value;
	 var searchOptionValue = document.getElementById("searchOption").value;
	 var searchText;
	 var searchOption;
    $.ajax({
        dataType: 'json',
        type: "POST",
        url: '/searchEmployees',
		data: {searchText : searchTextvalue, searchOption : searchOptionValue},
        context: this,
        success: function (json){
			console.log("Searching Employees");
            var tableContent = '';
            $.each(json, function(key, value){
                tableContent += '<tr>'
                tableContent += '<td>' + value.fullName + '</td>';
                tableContent += '<td>' + value.email + '</td>';
                tableContent += '<td>' + value.title + '</td>';
				tableContent += '<td>' + value.department + '</td>';
				tableContent += '<td>' + value.salary + '</td>';
				tableContent += '<td>' + value.superiors + '</td>';
				tableContent += '<td>' + value.subordinates + '</td>';
				tableContent += '<td>' + value.stat + '</td>';
				tableContent += '</tr>'
            });

            $('#displayTable').append(tableContent);
        },
        error: function(error){
            console.log(error);
        }

     });
 })