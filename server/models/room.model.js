const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    uID:{
        type:String,
        required:true,
        unique:true
    },
    noOfUser:{
        type:Number,
        required:true
    }
},{versionKey:false});

module.exports = mongoose.model("room", roomSchema);