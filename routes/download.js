var express = require('express');
var app = express();
var database = require('../config/database');

app.post('/download', (req, res) => {
	let requestBody = req.body

	let user_id = requestBody.user_id
	let resource_id = requestBody.resource_id
	let timestamp = requestBody.timestamp


	let sql = `INSERT INTO DOWNLOADS(USER_ID, RESOURCE_ID, TIMESTAMP) VALUES(${user_id}, ${resource_id}, '${timestamp}')`

	database.query(sql, (err) => {
        if (err) {
            res.status(400).json({ message: err});
            return;
        }else{
            res.status(200).send("Download Sucess");
            return
        }
	});
})

module.exports = app;