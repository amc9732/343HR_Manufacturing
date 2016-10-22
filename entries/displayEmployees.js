/**
 * displayEmployees entry file
 *
 * This is the file that is loaded into the browser
 * when a user navigates to the loggedIn page
 *
 */

 $(function(e) {
    $.ajax({
        dataType: 'json',
        type: "GET",
        url: '/showEmployees',
        context: this,
        success: function (json){
            var tableContent = '';

            $.each(json, function(key, value){
                tableContent += '<tr>'
                tableContent += '<td>' + value.email + '</td>';
                tableContent += '<td>' + value.pass + '</td>';
                tableContent += '</tr>'
            });

            $('#displayTable').append(tableContent);
        },
        error: function(error){
            console.log(error);
        }

     });
 })