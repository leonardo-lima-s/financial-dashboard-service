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
			return res.status(409).send("Nome de usuário já existente");
		}

		//checking if email already exist
		//if email exist in the database respond with a status of 409
		const emailCheck = await User.findOne({ where: { email: req.body.email } });
		if (emailCheck) {
			return res.status(409).send("E-mail já está sendo utilizado");
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

const resetUserPassword = async (req, res, next) => {
	try {
		const username = await User.findOne({ where: { userName: req.body.userName } });
		if (!username) {
			return res.status(400).send("Nome de usuário não encontrado");
		}

		const emailCheck = await User.findOne({ where: { email: req.body.email } });
		if (!emailCheck) {
			return res.status(400).send("E-mail não encontrado");
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	saveUser,
	resetUserPassword,
};
