var express = require('express');
var app = express();
var database = require('../config/database');



//Register :- This route will store the new user data into database
app.post('/like', (req, res) => {
	let requestBody = req.body

	let user_id = requestBody.user_id
	let resource_link = requestBody.resource_link

	let sql = `INSERT INTO LIKES(USER_ID, RESOURCE_LINK) VALUES(${user_id}, '${resource_link}')`

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
	let resource_link = requestBody.resource_link

	let sql = `DELETE FROM LIKES WHERE RESOURCE_LINK = '${resource_link}' and USER_ID = ${user_id}`
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

app.get('/my-liked/:id', (req, res) => {
	const userid = req.params.id
	let sql = `SELECT resource_link FROM likes where user_id = ${userid} and  resource_link like '%photos%'`

	database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ message: err});
            return;
        }else{
            res.send(result)
            return
        }
	});
})

module.exports = app;