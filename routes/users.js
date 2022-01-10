var express = require('express');
var app = express();
var database = require('../config/database');
var authValidations = require('../validations/validate');

app.post('/users', (req, res) => {
	let requestBody = req.body
	const {error} = authValidations(requestBody)
	if (error) {
        res.json({
            message: error.details[0].message
        })
    } else {
    	let firstName = requestBody.firstName
    	let lastName = requestBody.lastName
  		let email = requestBody.email
  		let password = requestBody.password
  		
  		// Check if user already exists
  		let sql = `SELECT * FROM USERS WHERE EMAIL = '${email}'`
	    database.query(sql, (err, result) => {
	            if (err) {
	                res.status(400).send(err);
	                return;
	            }
	            if (result.length){
	            	res.status(200).json({
			            message: "User already exists. Try another email id."
			        })
	            }else{
	            	sql = `INSERT INTO USERS(first_name, last_name, email, password) 
					VALUES('${firstName}', '${lastName}', '${email}', '${password}')`
				    database.query(sql, (err) => {
				            if (err) {
				                res.status(400).send(err);
				                return;
				            }else{
				                res.status(200).send("User joined Pixellery :)");
				                return
				            }
				    });
	            }
	    });


		
	}
})

module.exports = app;