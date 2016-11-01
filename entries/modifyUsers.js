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

    $("#ModifyUser").attr("action", "/addNewUser");

    $('#addUserBtn').show();
    $('#editUserBtn').hide();
    $('#deleteUserBtn').hide();

    $("#ModifyUser").show();
});

$('#searchEmployees').click(function (e) {
    e.preventDefault();
    $("#editType").html("<h2>Update User</h2>")
    clearForm();

    $("#ModifyUser").attr("action", "/updateEmployee");

    $('#addUserBtn').hide();
    $('#editUserBtn').show();
    $('#deleteUserBtn').show();

     var searchTextvalue = document.getElementById('employeeList').value;
     var searchOptionValue = "fullName";
     var searchText;
     var searchOption;
     $("#userToEdit").attr("value", searchTextvalue);
     $.ajax({
         dataType: 'json',
         type: "POST",
         url: '/searchEmployees',
         data: {searchText : searchTextvalue, searchOption : searchOptionValue},
         context: this,
         success: function (json){
            console.log("Searching Employees");

             $.each(json, function(key, value){

                 $("#fullName").val(value.fullName);
                 $("#email").val(value.email);
                 $("#pass").val(value.pass);
                 $("#title").val(value.title);
                 $("#selectDepartment").val(value.department);
                 $("#superiorList").val(value.superiors);
                 $("#phoneNum").val(value.phoneNum);
                 $("#address").val(value.address);
                 $("#salary").val(value.salary);
                 $("#status").val(value.stat);
             });
         },
         error: function(error){
             console.log(error);
         }

      });
      $("#ModifyUser").show();

});


$('#deleteUserBtn').click(function (e){
    e.preventDefault();
    var userToDeleteValue = document.getElementById('userToEdit').value;
    var userToDelete;

    if (confirm("Delete user " + userToDeleteValue + "?")) {
        $.ajax({
             dataType: 'json',
             type: "POST",
             url: '/deleteEmployee',
             data: {userToDelete : userToDeleteValue},
             context: this,
             success: function (json){
                window.location.href = "/deleteUserMessage";
             },
             error: function(error){
                 console.log(error);
             }

        });
    }
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
