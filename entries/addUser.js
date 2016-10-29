/**
 * addUser entry file
 *
 * This is the file that is loaded into the browser
 * when a user navigates to the addUser page
 *
 */

$(document).ready(function(){
    populateEmployeeDropdown();
});

function populateEmployeeDropdown() {
    $('#superiorList').html('<option selected disabled hidden> -- Select a Superior --</option>');

    // Get all employees and populate 'superiorList' bar
    $.ajax({
        url: '/showEmployees',
        type: "get",
        context: this,
        success: function (json) {
            $.each(json, function (key, employee) {
                $("#superiorList").append("<option>" + employee.fullName + "</option>")
            });
            $("#superiorList").selectpicker({
                liveSearch: true
            });
        }
    });
}