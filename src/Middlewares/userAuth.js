const express = require("express");
const db = require("../Models");
const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
	try {
		//search the database to see if user exist
		//if username exist in the database respond with a status of 409
		const username = await User.findOne({ where: { userName: req.body.userName } });
		if (username) {
			return res.json(409).send("username already taken");
		}

		//checking if email already exist
		//if email exist in the database respond with a status of 409
		const emailCheck = await User.findOne({ where: { email: req.body.email } });
		if (emailCheck) {
			return res.json(409).send("Authentication failed");
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	saveUser,
};
