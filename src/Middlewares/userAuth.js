const express = require("express");
const db = require("../Models");
const User = db.users;

const saveUser = async (req, res, next) => {
	try {
		const username = await User.findOne({ where: { userName: req.body.userName } });
		if (username) {
			return res.status(409).send("Nome de usuário já existente");
		}

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
