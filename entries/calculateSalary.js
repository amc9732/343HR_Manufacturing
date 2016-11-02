/**
 * calculateSalary entry file
 *
 * This is the file that is loaded into the browser
 * when a user navigates to the calculateSalary page
 *
 */
 var displayTableBase = "<tbody><tr><th>Employee ID</th><th>Salary</th><th>Commission</th><th>Paycheck Value</th></tr></tbody>";

 $("#searchEmployees").click(function(e) {
     $('#displayTable').html(displayTableBase);
	 var employeeID = document.getElementById("employeeID").value;
	 var salaryValue;
	 console.log(employeeID)
	 var eID;
	 if (employeeID > 0){
         $.ajax({
            dataType: 'json',
            type: "GET",
            url: '/paycheck/' + employeeID,
            data: {eID : employeeID},
            context: this,
            success: function (json){
                $.each(json, function(key, value){
                    salaryValue = value.salary;
                });
                if (isNaN(salaryValue)){
                    displayAlert(salaryValue);
                    return false;
                } else {
                    $.each(json, function(key, value){
                        salaryValue = value.salary;
                    });
                    console.log("here");
                    $.ajax({
                        dataType: 'json',
                        type: "GET",
                        url: '/revenue/employee/' + employeeID,
                        data: {eID : employeeID},
                        context: this,
                        success: function (json){
                            var tableContent = '';
                            $.each(json, function(key, val){
                                tempValue = (Math.round((salaryValue / 52) * 100) / 100) + val;
                                tableContent += '<tr>'
                                tableContent += '<td>' + employeeID + '</td>'
                                tableContent += '<td>' + salaryValue + '</td>'
                                tableContent += '<td>' + val + '</td>'
                                tableContent += '<td>' + tempValue + '</td>';
                                tableContent += '</tr>'
                            });

                            $('#displayTable').append(tableContent);
                        },
                        error: function(error){
                            console.log(error);
                        }
                     });

                 }
                },
            error: function(error){
                console.log(error);
            }

         });
     } else {
        displayAlert("Enter a valid Employee ID");
     }
 });

 function displayAlert (message){
    debugger;
    alert(message);
 }
