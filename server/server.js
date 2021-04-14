const express = require("express");

const app = express();

app.get("/", async(req,res) => {
    console.log("Welcome to Tic-Tac-Toe")
})

app.listen(5000, () => {
    console.log("server is up and running on port 5000")
});