//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const User = db.users;

const signup = async (req, res) => {
	try {
		const { userName, email, password } = req.body;
		const data = { userName, email, password: await bcrypt.hash(password, 10) };

		const user = await User.create(data);

		//if user details is captured
		//generate token with the user's id and the secretKey in the env file
		// set cookie with the token generated
		if (user) {
			let token = jwt.sign({ id: user.id }, process.env.secretKey, { expiresIn: 1 * 24 * 60 * 60 * 100 });

			res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

			//send users details
			return res.status(201).send(user);
		} else {
			return res.status(409).send("Dados do usuário não estão corretos.");
		}
	} catch (error) {
		console.log(error);
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		//Find a user by their email
		const user = await User.findOne({
			where: {
				email: email,
			},
		});

		if (user) {
			const isSame = await bcrypt.compare(password, user.password);
			//if password is the same, generate token with user's id and the secretKey in the env file
			if (isSame) {
				let token = jwt.sign({ id: user.id }, process.env.secretKey, {
					expiresIn: 1 * 24 * 60 * 60 * 1000,
				});
				res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
				//send user data
				return res.status(200).send(user);
			} else {
				return res.status(401).send("Senha incorreta");
			}
		} else {
			return res.status(401).send("Usuário não encontrado");
		}
	} catch (error) {
		console.log(error);
	}
};

const resetPassword = async (req, res) => {
	try {
		const { userName, email, newPassword } = req.body;
		const data = { password: await bcrypt.hash(newPassword, 10) };
		const result = await User.update(data, { where: { userName, email } });

		if (result) {
			return res.status(200).send(result);
		} else {
			return res.status(400).send("Erro ao recuperar a senha");
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	signup,
	login,
	resetPassword,
};
