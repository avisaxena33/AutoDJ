var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express'); //Module for interface
var bodyParser = require('body-parser'); //Module for reading body in POST
var StudentClass = require('./StudentClass');
var TeacherClass = require('./TeacherClass');
var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/*+json' })); 
var Sessions = [];
var SessionsStudent = [];
var PlaceHolder = 0;
var ValidCode;

//var request = require('request');


app.get('/',function(req, res) {//
  console.log("Server Response");
	res.set({
		'Content-Type': 'text/html',
		"Access-Control-Allow-Origin": "*", //"*" eventually becomes HTML front-end host URL
		"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept" //The CORS we wanted to get around from the beginning
	});
	var ASDF = "ASDF="//Yes or No value in JSON Format
		if(ValidCode == "True")
		{
		ASDF = ASDF + "Yes";
		}else{
		ASDF = ASDF + "No";	
		}
	console.log(ASDF);
	res.send(ASDF);
	console.log(SessionsStudent);
});

app.post('/', function(req, res) {
	res.set({
		'Content-Type': 'text/html',
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"
	});
	if(req.body.code != null)
	{
	code = req.body.code;//Change teacher to whatever the variable name is Ex: "teacher=Seom&butt=nice"
	classname = req.body.className;
	console.log("req received: " + code + classname);
	SessionsStudent[PlaceHolder] = StudentClass();
	SessionsStudent[PlaceHolder].StudentName = "";
	Sessions[PlaceHolder] = TeacherClass();
	Sessions[PlaceHolder].TeacherClassName = classname;
	Sessions[PlaceHolder].TeacherCode = code;
	
	PlaceHolder++;
	console.log(Sessions[0]);
	code = null;
	}else if (req.body.CheckCode != null)
	{
		console.log("Checkpoint 1");
		for(a = 0; a < PlaceHolder; a++)
		{
			console.log("Checkpoint 2");
			if(parseInt(Sessions[a].TeacherCode) != req.body.CheckCode)
			{
			console.log(Sessions[a].TeacherCode);
			console.log("Failure " + a);
			}else{
				SessionsStudent[a].StudentName = req.body.studentName;
				ValidCode = "True";
			}
		}

		CheckCode = null;
	}else if(req.body.HelpState != null)
	{
	console.log("I am 10/10");
	for(a = 0; a < PlaceHolder; a++)
		{
			console.log("eSports Seroni");
			if(SessionsStudent[a].StudentName != req.body.studentName)
			{
				console.log("eSports Fail" + a);
				console.log(SessionsStudent[a].StudentName);
			}else{
				SessionsStudent[a].StudentResponse = req.body.HelpState;
				console.log(SessionsStudent[a].StudentResponse)
				 }
		}
		console.log("eSports Seroni is Jack")
	}
  res.send();
});

//404 Response
function send404Response(response){
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("Error 404: Page not found!");
	response.end();
};


app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/'); //Hosted locally
});

		//var i = Sessions.indexOf(req.body.CheckCode);
		//console.log("Checkpoint 2");
		//if(i == -1)
		//{
			//console.log("Checkpoint 3");
			//domain = "Error";
			//app.get();
		//}else{
			//console.log("Checkpoint 4");
		//}
