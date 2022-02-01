var express = require('express');
var app = express();
var database = require('../config/database');

//Register :- This route will store the new user data into database
app.post('/new-collection', (req, res) => {
	let requestBody = req.body

	let user_id = requestBody.user_id
	let collection_name = requestBody.collection_name

	let sql = `INSERT INTO COLLECTIONS (COLLECTION_NAME, USER_ID) VALUES('${collection_name}', ${user_id})`

	database.query(sql, (err) => {
        if (err) {
            res.status(400).json({ message: err});
            return;
        }else{
            res.status(200).send("New Collection Added");
            return
        }
	});
})

app.get('/get-collection/:id', (req, res) => {
	const userid = req.params.id
	let sql = `SELECT distinct collection_name FROM COLLECTIONS WHERE USER_iD=${userid}`

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