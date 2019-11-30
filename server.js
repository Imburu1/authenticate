const express = require("express");
const mongo = require("mongodb");
const url = "mongodb://localhost:27017";
//create an instance

const app = express();
app.listen(5000);

//create home page routes
app.get('/',(req,res)=> {
res.sendFile(__dirname+"/"+"index.html");
});

//create register routes
app.get('/reg_form',(req,res)=> {
res.sendFile(__dirname+"/"+"register.html");
});

//Register route & Post data
app.get('/register',(req,res)=> {

response = {
	fname : req.query.firstName,
	lname : req.query.lastName,
	email : req.query.email,
	usr   : req.query.userName,
	pwd   : req.query.password
} 

//connect to db


mongo.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db)=>{
if(err){
		console.log(err);
		process.exit(0);
	}
	
	var dbo = db.db('ExpressExample');
	console.log("database connected!");

	var collection = dbo.collection('users');
	collection.insertOne(response,(err,result) =>{
		if(err) {
			console.log(err);
			process.exit(0);
		}
		console.log(result);
		db.close();
	});
});
});


//create workspace routes
app.get('/login',(req,res)=> {
res.sendFile(__dirname+"/"+"workspace.html");
});


//Find & display data
app.get('/view',(req,res)=> {

mongo.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db)=>{
if(err){
		console.log(err);
		process.exit(0);
	}

	var dbo = db.db('ExpressExample');
	console.log("database connected!");

	var collection = dbo.collection('users');
	collection.find().toArray((err,result) =>{
		if(err) {
			console.log(err);
			process.exit(0);
		}
		console.log(result);
		res.send(result);
		db.close();
	});
});

});



//Find and Delete data
app.get('/delete',(req,res)=> {

let delName = req.query.DelName;

mongo.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db)=>{
if(err){
		console.log(err);
		process.exit(0);
	}

	var dbo = db.db('ExpressExample');
	console.log("database connected!");

	var collection = dbo.collection('users');
	collection.deleteOne({usr:delName},(err,results) =>{
		if(err) {
			console.log(err);
			process.exit(0);
		}
		console.log(results);
		db.close();
	});
});
});



//Register route & update data
app.get('/update',(req,res)=> {

let oldupdt = req.query.oldUpdName;
let newupdt = req.query.updateName;


mongo.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db)=>{
if(err){
		console.log(err);
		process.exit(0);
	}

	var dbo = db.db('ExpressExample');
	console.log("database connected!");

	var collection = dbo.collection('users');
	collection.updateOne({usr: oldupdt},{'$set':{'usr':newupdt}},(err,results) =>{
		if(err) {
			console.log(err);
			process.exit(0);
		}
		console.log(results);
		db.close();
	});
});
});