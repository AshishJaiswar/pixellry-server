var express = require('express');
var app = express();
var database = require('../config/database');


app.get('/dashboard', (req, res) => {
	let sql = `select 
				(select count(*) from users) as total_users, 
				(select count(*) from keywords) as total_searches, 
				(select count(*) from collections) as total_collections,
				(select count(*) from downloads) as total_downloads
				from dual;`

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

app.get('/user-chart', (req, res) => {
	let sql = `Select count(*) as no_of_user, 
				DATE_FORMAT(STR_TO_DATE(date_joined, '%d/%m/%Y'), '%M') as date 
				from users Group by date;`

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

app.get('/top-searches', (req, res) => {
	let sql = `select count(*) as count, 
	keyword from keywords group by keyword order by count desc limit 5`

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

app.get('/table-searches', (req, res) => {
	let sql = `SELECT users.id, users.first_name, 
	users.last_name, keywords.keyword, keywords.timestamp 
	FROM users join keywords on users.id = keywords.user_id;`

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

app.get('/table-downloads', (req, res) => {
	let sql = `SELECT users.id, users.first_name, users.last_name, 
	downloads.resource_id, downloads.timestamp 
	FROM users join 
	downloads on users.id = downloads.user_id;`

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