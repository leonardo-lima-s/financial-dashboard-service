const dotenv = require("dotenv").config();

const express = require("express");
const sequelize = require("sequelize");
const cookieParser = require("cookie-parser");
const db = require("./src/Models");
const userRoutes = require("./src/Routes/userRoutes");
const cors = require("cors");

const corsOptions = {
	origin: "http://localhost:5173",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type"],
};

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

db.sequelize.sync({ force: true }).then(() => {
	console.log("db has been re sync");
});

app.use(cors(corsOptions));
app.use("/api/users", userRoutes);
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
