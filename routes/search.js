var express = require('express');
var app = express();
var database = require('../config/database');

app.post('/keyword', (req, res) => {
	let requestBody = req.body

	let user_id = requestBody.user_id
	let keyword = requestBody.keyword

	let sql = `INSERT INTO KEYWORDS(USER_ID, KEYWORD) VALUES(${user_id}, '${keyword}')`

	database.query(sql, (err) => {
        if (err) {
            res.status(400).json({ message: err});
            return;
        }else{
            res.status(200).send("Sucess");
            return
        }
	});
})

module.exports = app;