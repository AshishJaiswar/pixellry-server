var express = require('express');
var app = express();
var database = require('../config/database');



//Register :- This route will store the new user data into database
app.post('/new-collection', (req, res) => {
	let requestBody = req.body

	let user_id = requestBody.user_id
	let img_id = requestBody.img_id

	let sql = `INSERT INTO LIKES(USER_ID, IMG_ID) VALUES(${user_id}, ${img_id})`

	database.query(sql, (err) => {
        if (err) {
            res.status(400).json({ message: err});
            return;
        }else{
            res.status(200).send("Liked");
            return
        }
	});
})

app.get('/get-collection/:id', (req, res) => {
	console.log(req.params)
	res.send("My collections")
})

module.exports = app;