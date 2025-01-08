module.exports = (sequelize, DataTypes) => {
	const account = sequelize.define("account", {
		id: {
			type: DataTypes.UUID, // Usando UUID para um ID único
			defaultValue: Sequelize.UUIDV4, // Gera automaticamente um UUID v4
			allowNull: false,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			isEmail: true, //checks for email format
			allowNull: false,
			references: {
				model: "user",
				key: "email",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
		accountNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		bankName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
