var express = require('express');
var app = express();
var database = require('../config/database');

app.get('/get-account-details/:id', (req, res) => {
	const userid = req.params.id
	let sql = `SELECT first_name, last_name, email, profile_img FROM USERS WHERE ID=${userid}`

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

app.put('/save-details', (req, res)=>{
	let requestBody = req.body
	console.log(requestBody)
	let user_id = requestBody.user_id
	let pho_no = requestBody.pho_no
	let dob = requestBody.dob
	let address = requestBody.address;

	let sql = `update users set phone_no = ${pho_no}, dob = '${dob}', address = '${address}' where id = ${user_id}`

	database.query(sql, (err) => {
        if (err) {
            res.status(400).json({ message: err});
            return;
        }else{
            res.status(200).send("Profile updated.");
            return
        }
	});
})

module.exports = app;