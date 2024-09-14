const express = require("express");

const config = require("./config.js");

let index = require("./routes/index");

const app = express();

// Allow requests from all domains and localhost
app.all("/*", function (req, res, next) {
    // logger.log("info", `${req.method} ${req.url}`);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
});

app.use(express.json());
app.use(express.static("./public"));

app.use(index);

app.listen(config.port, () => {
    console.log(`listening on port: ${config.port}`);
});
