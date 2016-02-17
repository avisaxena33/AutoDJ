var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express'); //Module for interface
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/*+json' })); 
var GuestClass = require('./GuestClass');
var DJClass = require('./DJClass');
var HostSession = [];//This contains the DJ Name and Code 
var GuestSession = [];//This contains the Guest Name, the code entered, and their vote 
var PlaceHolder = 0;
var NumOfGuests = 0;

app.get('/',function(req, res) {//
  console.log("Server Response");
	res.set({
		'Content-Type': 'text/html',
		"Access-Control-Allow-Origin": "*", //"*" eventually becomes HTML front-end host URL
		"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept" //The CORS we wanted to get around from the beginning
	});
    var Avi = "Avi=";
    for(i=0;i<NumOfGuests;i++)
        {
            if(GuestSession[i].GuestResponse == "")
                {
                    
                }else{
                    Avi = Avi+GuestSession[i].GuestResponse + "&&" + "Bargrav=" + GuestSession[i].GuestCorre;
                }
            console.log(Avi);
            res.send(Avi);
        }
    
});

app.post('/', function(req, res) {
	res.set({
		'Content-Type': 'text/html',
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"
	});

if(req.body.GuestId == "KappaRoss")//Enters new users in to array
    {
     GuestName = req.body.GuestName;
     GuestCode = req.body.GuestCode;
     GuestId = req.body.GuestId;
     
     GuestSession[NumOfGuests].GuestName = GuestName;
     GuestSession[NumOfGuests].GuestCode = GuestCode;
     
     //console.log(GuestSession[NumOfGuests]);
    NumOfGuests++;
    
    }
if(req.body.GuestId == "UpVote")
    {
        Name = req.body.GuestName;
        Votes = req.body.Vote;
        ParralTrack = req.body.CorreTrack;
        for(i=0;i<NumOfGuests;i++)
        {
            if(GuestSession[i].GuestName == Name)
                {
                    GuestSession[i].GuestResponse = Votes;
                    GuestSession[i].GuestCorre = ParralTrack;
                }
        }
        console.log(ParralTrack);
        console.log(Votes);
    }
    //console.log("Test202");
if(req.body.djId == "Initializing")
    {
    code = req.body.code;//Change teacher to whatever the variable name is Ex: "teacher=Seom&butt=nice"
	DJName = req.body.DJName;
	console.log("req received: Code: " + code + "DJ: " + DJName);
	GuestSession[PlaceHolder] = GuestClass();//Look up placeholder stuff 
	GuestSession[PlaceHolder].GuestName = "";
    GuestSession[PlaceHolder].GuestResponse = 0;
	HostSession[PlaceHolder] = DJClass();
	HostSession[PlaceHolder].DJSessionName = DJName;
	HostSession[PlaceHolder].DJCode = code;
    
	PlaceHolder++;
    }
	//console.log("Test303");
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