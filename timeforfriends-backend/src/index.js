require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require('./api/endpoints')
const app = express();
app.use(express.json());
// app.use(cors());
app.use('/',router)

let dbName = process.env.DB_NAME;
mongoose.connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

global.db = mongoose.connection;
db.on("error", () => console.log("Could not connect to DB"));
db.once("open", () => {
    console.log("Connected to DB");
    startWebServer();
});

const startWebServer = () => {
    // Start the webserver on port 3000
    app.listen(3000, () => console.log("Listening on port 3000"));
};

