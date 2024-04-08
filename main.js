const express = require('express');
const axios = require('axios');
const app = express();

const cors = require("cors");
const port2 = 80;
app.listen(port2, () => {
    console.log(port2);
})
app.use(cors());
app.options('*', cors());

app.set("view engine", "ejs");
app.set("views", "src2");

app.use(express.static("src2"));

app.get("/", (req, res) => {
    res.render("ejs/main.ejs");
});
app.get("/turnLight", (req, res) => {
    res.render("ejs/turnLightOn.ejs");
});