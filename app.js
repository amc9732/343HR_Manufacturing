var express = require('express');
var app = express();
var authenticated = false;
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test",
  port: 3306
});
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//connection.connect();

connection.query('SELECT * from hr_database.employees', function(err, rows, fields) {
  if (!err)
    console.log('Connection Successful');
  else
    console.log('Error while performing Query.');
});

//connection.end();
// Binding express app to port 3000
app.listen(3000,function(){
    console.log('Node server running @ http://localhost:3000')
});


app.use('/node_modules',  express.static(__dirname + '/node_modules'));

app.use('/style',  express.static(__dirname + '/style'));

app.use('/entries',  express.static(__dirname + '/entries'));

app.engine('.html', require('ejs').__express);

app.get('/',function(req,res){
    res.sendFile('home.html',{'root': __dirname + '/templates'});
});


app.get('/home',function(req,res){
	if (!authenticated){
		res.sendFile('signin.html',{'root': __dirname + '/templates'});
	}
	if (authenticated){
		res.sendFile('loggedin.html', {'root':__dirname + '/templates'});
	}

});
app.get('/homeretry',function(req,res){
    res.sendFile('signinretry.html',{'root': __dirname + '/templates'});
});

app.get('/showModifyUsers',function(req,res){
	if(authenticated){
		res.sendFile('modifyUsers.html',{'root':__dirname + '/templates'})
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}

});

app.get('/addUserMessage',function(req,res){
    res.sendFile('addUserMessage.html',{'root': __dirname + '/templates/successPages'});
});

app.get('/editUserMessage',function(req,res){
    res.sendFile('editUserMessage.html',{'root': __dirname + '/templates/successPages'});
});

app.get('/deleteUserMessage',function(req,res){
    res.sendFile('deleteUserMessage.html',{'root': __dirname + '/templates/successPages'});
});

app.get('/loggedin',function(req,res){
    if(authenticated){
        res.sendFile('loggedin.html',{'root': __dirname + '/templates'});
    } else {
    	res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
    }
});

app.get('/calculateSalary', function(req,res){
	if(authenticated){
		res.sendFile('calculateSalary.html',{'root': __dirname + '/templates'});
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}
});


app.get('/paycheck/?:id', function(req, res){
	if(authenticated){
		var selectString = 'SELECT * FROM hr_database.employees WHERE id = "'+req.params.id+'" ';
		connection.query(selectString, function(err,results){
		if(err) throw err;
		res.send(results);
	});
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}

});

app.get('/revenue/employee/?:id', function(req, res){
	if(authenticated){
		//This functionality is stubbed out. The real API call will go to the sales silo.
		// API Call currently returns 200 (dollars) representing total commission sales
		testData = {commission:200};
		var string=JSON.stringify(testData);
		res.json(testData);
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}

});

app.get('/showEmployees', function(req, res){
	if(authenticated){
		connection.query('SELECT * FROM hr_database.employees', function(err,results){
		if(err) throw err;
		res.send(results);
	});
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}

});

app.get('/verifyCustomerSupportEID/?:eid', function(req, res){
	var selectString = 'SELECT department FROM hr_database.employees WHERE id = "'+req.params.eid+'" ';
	connection.query(selectString, function(err,results){
		if(err) throw err;
		var string = JSON.stringify(results);
		console.log(string);
		if(string == '[{"department":"Human Resources"}]' ){
			testData = {bool:True};
			var string=JSON.stringify(testData);
			res.json(testData);
		}
		else{
			testData = {bool:False};
			var string=JSON.stringify(testData);
			res.json(testData);
		}
	});
});

app.get('/verifySalesEID/?:eid', function(req, res){
	var selectString = 'SELECT department FROM hr_database.employees WHERE id = "'+req.params.eid+'" ';
	connection.query(selectString, function(err,results){
		if(err) throw err;
		var string = JSON.stringify(results);
		console.log(string);
		if(string == '[{"department":"Sales"}]' ){
			testData = {bool:True};
			var string=JSON.stringify(testData);
			res.json(testData);
		}
		else{
			testData = {bool:False};
			var string=JSON.stringify(testData);
			res.json(testData);
		}
	});
});

app.post('/searchEmployees', function(req, res){
	if(authenticated){
		var searchText = req.body.searchText;
		var searchOption = req.body.searchOption;
		var selectString = 'SELECT * FROM hr_database.employees WHERE '+req.body.searchOption+' = "'+req.body.searchText+'" ';
		connection.query(selectString, function(err,results){
		if(err) throw err;
		res.send(results);
	});
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}

});


app.get('/showLogoutSuccess',function(req,res){

	res.sendFile('logoutsuccess.html',{'root':__dirname + '/templates'})
	authenticated = false;

});

app.post('/addNewUser', function(req, res) {
	console.log('req.body');
	console.log(req.body);

	var record = {fullName:req.body.fullName, email:req.body.email, pass:req.body.pass,
		title:req.body.title, department:req.body.selectDepartment, superiors:req.body.superiorList, salary:req.body.salary,
		phoneNum:req.body.PhoneNum, stat:req.body.status, address: req.body.address};


	connection.query('INSERT INTO hr_database.employees SET ?', record, function(err,res){
	  	if(err) throw err;
		console.log('Last record insert id:', res.insertId);

	});

	res.redirect('/addUserMessage');
	//connection.end();

	res.end();
});

app.post('/updateEmployee', function(req, res){
    console.log('req.body');
    console.log(req.body);
    var userToEdit = req.body.userToEdit

    var record = {fullName:req.body.fullName, email:req.body.email, pass:req.body.pass,
        title:req.body.title, department:req.body.selectDepartment, superiors:req.body.superiorList, salary:req.body.salary,
        phoneNum:req.body.PhoneNum, stat:req.body.status, address: req.body.address};


    connection.query('UPDATE hr_database.employees SET ? WHERE fullName=?', [record, userToEdit], function(err,res){
        if(err) throw err;
        console.log('Last record insert id:', res.insertId);
    });

    res.redirect('/editUserMessage');
    //connection.end();

    res.end();
});

app.post('/deleteEmployee', function(req, res){
    console.log('req.body');
    console.log(req.body);
    var userToDelete = req.body.userToDelete;

    connection.query('DELETE FROM hr_database.employees WHERE fullName=?', userToDelete, function(err,res){
        if(err) throw err;
        console.log('Last record insert id:', res.insertId);
    });

    //connection.end();

    res.end();
});


app.post('/verifyuser', function(req,res){
	console.log('checking user in database');
	console.log(req.body);
	var selectString = 'SELECT COUNT(email) FROM hr_database.employees WHERE email="'+req.body.email+'" AND pass="'+req.body.pass+'" ';

	connection.query(selectString, function(err, results) {

        console.log(results);
        var string=JSON.stringify(results);
        console.log(string);
        //this is a walkaround of checking if the email pass combination is 1 or not it will fail if wrong pass is given
        if (string === '[{"COUNT(email)":1}]') {
			res.redirect('/loggedin');
			authenticated = true;
	    } else {
        	res.redirect('/homeretry');
     }
});

});

