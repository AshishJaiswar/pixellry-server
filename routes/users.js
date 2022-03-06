var express = require('express');
var app = express();
var database = require('../config/database');
var authValidations = require('../validations/validate-register');
var passwordHash = require('password-hash');


//Register :- This route will store the new user data into database
app.post('/users', (req, res) => {
	let requestBody = req.body

	// Validating data of user used while joining / registering.
	const {error} = authValidations(requestBody)
	if (error) {
        res.json({
            message: error.details[0].message
        })
    }else { // If no error we can insert data into database
    	let firstName = requestBody.firstName
    	let lastName = requestBody.lastName
  		let email = requestBody.email
  		// Hashed password
  		let password = passwordHash.generate(requestBody.password);

  		let date_joined = requestBody.joined_date
  		
  		
  		// Check if user already exists
  		let sql = `SELECT * FROM USERS WHERE EMAIL = '${email}'`
	    database.query(sql, (err, result) => {
	            if (err) {
	                res.status(400).send(err);
	                return;
	            }
	            // if user already exists then result varibale contains more than 1 objects
	            if (result.length){
	            	res.status(200).json({
			            message: "User already exists. Try another email id."
			        })
	            }else{ // else insert values to database
	            	sql = `INSERT INTO USERS(first_name, last_name, email, password, phone_no, dob, address, profile_img, date_joined) 
					VALUES('${firstName}', '${lastName}', '${email}', '${password}', 0, "", "", 'https://www.gravatar.com/avatar/542e167f5a3cfc520c5c86d5a5d96b88?s=256&d=mm', '${date_joined}')`
				    database.query(sql, (err) => {
				            if (err) {
				                res.status(400).send(err);
				                return;
				            }else{
				                res.status(200).send("User joined");
				                return
				            }
				    });
	            }
	    });


		
	}
})


module.exports = app;