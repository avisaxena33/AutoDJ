var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/*+json' })); 
var Rooms = [];
var usernames = [];//{}for json data, but we use [] because of the way we store the data
var UniqueCode = true;
var ValidCode = false;
var genCode;
var NumberOfPeople = 0;

io.on('connection', function (socket) {

socket.on("Create Session", function(data){
	genRand();
	var roomName = genCode;
	var Name = data.userName;
	socket.username = userName;
	socket.roomName = roomName;
	socket.join(roomName);
	usernames.push({userName: Name, roomName:genCode, rank:"Host"});
	Rooms.push(roomName);
	NumberOfPeople++;
});
	
socket.on("join session", function(Code){
	ValidCode = false;
	var roomName = data.RoomName;//The code that the user enters
	var Name = data.userName;
	for(i=0;i<NumberOfPeople;i++)
		{
			if(usernames[i]['rank'] == "Host" && usernames[i]['code'] == roomName)
			{
					NumberOfPeople++;
					for(i=0;i<Rooms.length;i++)
					{
						if(roomName == Rooms[i])
						{
							socket.username = userName;
							socket.roomName = roomName;
							ValidCode = true;
							usernames.push({userName:Name, roomName:roomName,rank:"User"});
							socket.join(Rooms[i]);
						}
					}
			}
		}
		if(ValidCode == false)
		{
			socket.emit('Bad Code', {
				result:false
			});			
		}	
});

socket.on('disconnect', function(data){
	for(i=0;i<usernames.length;i++)
	{
		if(usernames[i]['userName'] == socket.username)
		{
			if(usernames[i]['rank'] == 'User')
			{
				NumberOfGuests--;
			}else if(usernames[i]['rank'] == 'Host')
			{
				for(j=0;j<Rooms.length;j++)
				{
					if(Rooms[j] == usernames[i]['code'])
					{
					io.sockets.emit('end of session',{
						Code:usernames[i]['code']
					})
					Rooms.splice(j,1);
					NumberOfGuests--;
					}
				}
			}
			usernames.splice(i,1);
		}
	}
	socket.leave(socket.room);
});

	
	
function genRand()	{
	genCode = Math.floor(Math.random() * 60000);
	var HostNumber = 0;
		for(i=0;i<usernames.length;i++)
		{
			if(usernames[i]['rank'] == 'Host')
			{
				HostNumber++;
			}
		}

		for(i=0;i<HostNumber;i++)
		{
			if(usernames[i]['rank'] == 'Host')
			{
				if(usernames[i]['code'] == genCode)
				{
				UniqueCode = false;
				break;
				}
			}
		}
		if(UniqueCode == false)
		{
			UniqueCode = true;
			genRand();
		}
}		

function send404Response(response){
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("Error 404: Page not found!");
	response.end();
};

app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 3000, function () {
  console.log('Server listening at port %d 3000');
});
});
