var express = require('express');
var app = express();
var database = require('../config/database');



//Register :- This route will store the new user data into database
app.post('/like', (req, res) => {
	let requestBody = req.body

	let user_id = requestBody.user_id
	let resource_id = requestBody.resource_id

	let sql = `INSERT INTO LIKES(USER_ID, RESOURCE_ID) VALUES(${user_id}, ${resource_id})`

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

app.post('/unlike', (req, res) => {
	let requestBody = req.body

	let user_id = requestBody.user_id
	let resource_id = requestBody.resource_id

	let sql = `DELETE FROM LIKES WHERE RESOURCE_ID = ${resource_id} and USER_ID = ${user_id}`
	database.query(sql, (err) => {
        if (err) {
            res.status(400).json({ message: err});
            return;
        }else{
            res.status(200).send("Unliked");
            return
        }
	});
})

module.exports = app;