const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const router = require('./api/endpoints')
app.use('/',router)
const mock = require("./config/mockData")

let dbName = process.env.DB_NAME;
mongoose.connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

global.db = mongoose.connection;
db.on("error", () => console.log("Could not connect to DB"));
db.once("open", () => {
    console.log("Connected to DB");
    mock.postAll()
    startWebServer();
});


const startWebServer = () => {
    // Start the webserver on port 3000
    app.listen(process.env.DB_PORt, () => console.log("Listening on port 3001"));
};


