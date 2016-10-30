/**
 * modifyUsers entry file
 *
 * This is the file that is loaded into the browser
 * when a user navigates to the modifyUsers page
 *
 */



$(document).ready(function(){
    populateEmployeeDropdown();
});

$('#addUser').click(function (e) {
    e.preventDefault();
    $("#editType").html("<h2>New User</h2>")
    clearForm();

    $('#addUserBtn').show();
    $('editUserBtn').hide();

    $("#ModifyUser").show();

});

$('#searchEmployees').click(function (e) {
    e.preventDefault();
    $("#editType").html("<h2>Update User</h2>")
    clearForm();

    $('#addUserBtn').hide();
    $('editUserBtn').show();

     var searchTextvalue = $('#empoyeeList').value;
     var searchOptionValue = "fullName";
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
             //$('#displayTable').html(displayTableHtml);

             $.each(json, function(key, value){
                 tableContent += '<tr>'
                 tableContent += '<td>' + value.fullName + '</td>';
                 tableContent += '<td>' + value.email + '</td>';
                 tableContent += '<td>' + value.title + '</td>';
                 tableContent += '<td>' + value.department + '</td>';
                 tableContent += '<td>' + value.salary + '</td>';
                 tableContent += '<td>' + value.superiors + '</td>';
                 tableContent += '<td>' + value.stat + '</td>';
                 tableContent += '</tr>'
             });

             $('#displayTable').append(tableContent);
         },
         error: function(error){
             console.log(error);
         }

      });
      $("#ModifyUser").show();

});

/**
 * Hides the EditBox from the page.
 */
$('#btnCancel').click(function (e) {
    $("#ModifyUser").hide();
});



function populateEmployeeDropdown() {
    $('#employeeList').html('<option selected disabled hidden>-- Select an Employee --</option>');
    $('#superiorList').html('<option selected disabled hidden>-- Select a Superior --</option><option>None</option>');

    // Get all employees and populate 'employeeList' bar
    $.ajax({
        url: '/showEmployees',
        type: "get",
        context: this,
        success: function (json) {
            $.each(json, function (key, employee) {
                $("#employeeList").append("<option>" + employee.fullName + "</option>");
                $("#superiorList").append("<option>" + employee.fullName + "</option>");
            });
            $("#employeeList").selectpicker({
                liveSearch: true
            });
            $("#superiorList").selectpicker({
                liveSearch: true
             });
        }
    });
}


function clearForm() {
    $("#fullName").val("");
    $("#email").val("");
    $("#pass").val("");
    $("#title").val("");
    $("#selectDepartment").val("Select Department");
    $("#superiorList").val("-- Select a Superior --");
    $("#phoneNum").val("");
    $("#address").val("");
    $("#salary").val("");
    $("#status").val("");
}
