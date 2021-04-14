const express = require("express");

const app = express();

const cors = require("cors");

const connect = require("./config/db");

const Room = require("./models/room.model");

app.use(cors());

const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

connect();


app.get("/createRoom", (req,res) => {
    //Generate unique id for each room

    const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z'];

    let result = "";

    for(let i = 0; i<5; i++) {
        result += alphabets[Math.floor(Math.random() * 10000) % 25];
    }

    //Save created room to db
    const room =  new Room({uID:result, noOfUser:1});
    room.save().then((response) => {
        res.status(200).json({status:"success", message:`Room created with id ${response}`})
    })
    .catch((err) => {
        res.status(400).json({status:"failure", message:"Error creating room "+err})
    })
})

app.post("/joinRoom", jsonParser, async(req,res) => {
    // Check whether room exists or not
    const room_id = req.body.room_id;
    const room = await Room.findOne({uID:room_id}).then((response) => res.status(200).json({status:"success", message:"room exists"}))
    .catch((err) => res.status(404).json({status:"failed",message:"Error while checking room"+err}))

    if(room) {
        if(room.noOfUser < 2) {
            room.noOfUser++;
            const player = await room.save();
            res.status(201).json({player});
        }
        else {
            res.status(200).json({Error:"Room is full, Try after some time"});
        }
    }
    else {
        res.status(400).json({Error:"Enter valid room Id"});
    }
})

app.listen(5000, () => {
    console.log("server is up and running on port 5000")
});