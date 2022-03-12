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
	users.last_name, users.email, keywords.keyword, keywords.timestamp 
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
	users.email, downloads.resource_id, downloads.timestamp 
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

app.get('/table-collections', (req, res) => {
	let sql = `select users.id, 
	users.first_name, 
	users.last_name, 
	users.email,  
	collections.collection_name 
	from users join collections on users.id = collections.user_id;`

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

app.get('/table-collection-resource/:name', (req, res) => {
	const name = req.params.name
	let sql = `select resource_id from collection_resource where 
	collection_id = 
	(select id from collections where collection_name = '${name}')`

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

app.get('/table-user', (req, res) => {
	let sql = `SELECT first_name, last_name, email, 
	password, phone_no, dob, address, profile_img, date_joined FROM users;`

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

app.post('/delete-user', (req, res) => {

	let requestBody = req.body
	let email = requestBody.email
	let sql = `DELETE from users where email = '${email}';`

	database.query(sql, (err) => {
        if (err) {
            res.status(400).json({ message: err});
            return;
        }else{
            res.status(200).json({message: "User deleted"})
            return
        }
	});
})
module.exports = app;