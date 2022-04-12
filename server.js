const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var corsOptions = {
    origin: "http://localhost:8081"                                         //http port
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

db.sequelize.sync();
require("./app/routes/tutorial.routes")(app);                               //routes defined

app.get("/", (req, res) => {
    res.json({ message: "Welcome to MY APPLICATION." });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}. ");
});