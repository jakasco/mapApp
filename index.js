var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser'); 



//Tietokannan tiedot
var connection = mysql.createConnection({	

	host: 'localhost',
	user: 'root',
	password: '',
	database: 'map3'
	
});


//Tarkastetaan saadaanko MySql yhteys
connection.connect(function(error){	
	if(!!error){
			console.log("Error");
	}else{
		console.log("Connected to MySQL");
	}	
});


//Clientistä vastaan ottaminen
app.use(bodyParser());

app.post('/', function(req, res) {
  console.log(req.body); //Tulostaa mitä saadaan
  res.sendStatus(200);
  for (var key in req.body) {
  if (req.body.hasOwnProperty(key)) {
	  
    item = req.body[key];
	
	//Onko create/edit/delete vai keywords?
	if(item[0]=="Create"){
		
	var sqlString = "INSERT INTO marker VALUES ('"+item[1]+"','"+item[2]+"','"+item[3]+"','"+item[4]+"','"+item[5]+"','"+item[6]+"')";
	console.log("asd" + sqlString);
	run(sqlString);
	}
	else if(item[0]=="Edit"){		
		var sqlString = "UPDATE marker SET Title = '"+item[2]+"', Description = '"+item[3]+"', Coordinates = '"+item[4]+"', OpenHours ='"+item[5]+"' WHERE PlaceId = '"+item[1]+"'";
		run(sqlString);
	}
	else if(item[0]=="Delete"){
		var sqlString = "DELETE FROM marker WHERE PlaceId = '"+item[1]+"'";
		run(sqlString);
	}
	else if(item[0]=="Tag"){
		for(i =2; i<item.length; i++){
		var sqlString = "INSERT INTO keywords VALUES ( '"+item[i]+"', '"+item[1]+"')";
		run(sqlString);
		}
	}
	else if(item[0]=="delTag"){
		var sqlString = "DELETE FROM keywords WHERE Keyword = '"+item[2]+"' AND place ='"+item[1];
		run(sqlString);
		}
	
	else if(item[0]=="searchTag"){
		var rows = [];
		for(i =0; i<item[1].length; i++){
		var sqlString = "SELECT title FROM marker WHERE placeId = (SELECT place FROM keywords WHERE keyword = '"+item[1][i]+"');"
		var a = run(sqlString);
		rows.push(a);
		}

	}
	
  }
};
});


//Tietokantaan päivitys sql lauseilla
var run = function(sqlString) {

	console.log("sql lause: "+sqlString);
	
	connection.query(sqlString, function(error, rows, fields){
		if(!!error) {
			console.log("ERROR IN THE SQL QUERY");
		}else{
			console.log("SUCCESFULLY ADDED INTO DATABASE!");		
			console.log(rows);
			return rows+"a";
		}
});

}



//Kun sivu avataan
app.get('/', function(req, resp){

	resp.writeHead(200, {'Content-Type': 'text/html'});
	//Liitetään map.html tiedosto
	fs.readFile('./map.html',null, function(error, data){
		if (error){
			resp.writeHead(404);
			resp.write('File not found!');			
		}else {
			resp.write(data);		
			console.log("Map.html found!");
		}
		resp.end();
	});
	

})

app.listen(1337, function(){	
	console.log("Server started on port 1337");	

})

