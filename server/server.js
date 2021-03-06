const express = require("express");

const app = express();

const http = require("http").Server(app);

const io = require("socket.io")(http);

const cors = require("cors");

const connect = require("./config/db");

const Room = require("./models/room.model");

app.use(cors());

app.use(express.json());

connect();


app.get("/createRoom", (req,res) => {
    //Generate unique id for each room

    const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
                        'h', 'i', 'j', 'k', 'l', 'm', 'n',
                        'o', 'p', 'q', 'r', 's', 't', 'u',
                        'v', 'w', 'x', 'y', 'z',
                        '0','1','2','3','4','5','6','7','8','9'];

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

app.post("/joinRoom", async(req,res) => {
    // Check whether room exists or not
    const room = req.body.room;
    const room = await Room.findOne({uID:room})
    .catch((err) => res.status(404).json({status:"failed",message:"Error while checking room"+err}))

    if(room) {
        if(room.noOfUser < 2) {
            room.noOfUser++;
            const player = await room.save();
            res.status(201).json({player});
        }
        else {
            res.status(400).json({Error:"Room is full, Try after some time"});
        }
    }
    else {
        res.status(400).json({Error:"Enter valid room Id"});
    }
});

// open socket io connection
io.on('connection', (socket) => {
    //user joining room using registered room id
    socket.on('join', async room => {
        console.log('user joined', room);
        socket.join(room);

        const room = await Room.findOne({uID:room})
        .then((res) => { 
            console.log("Joining room successful"+res); 
        })
        .catch((err) => {
            console.log('Error occured while joining the room', err);
        });

        if(room && room.noOfUser === 2) {
            io.to(room).emit('You can play now');
        }
    })

    // Incoming message from chat
    socket.on('sendMessage', async({message, name, user_id, room}) => {
        const payload = {
            name,user_id,room,message
        }

        io.to(room).emit("messageReceived", payload);
    })

    socket.on('Clicked', ({i, name, user_id, room}) => {
        const stranger = {
            i,name,user_id,room
        }
        console.log(`${name} clicked ${i} square in room ${room}`);
        io.to(room).emit('clickReceived', click);
    })

    socket.on('playAgain', room => {
        io.to(room).emit('Play again')
    })
})

app.listen(5000, () => {
    console.log("server is up and running on port 5000")
});