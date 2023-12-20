const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type:String
    },
    email : {
        type:String
    },
    password : {
        type :String,
    },
    isArchived:{
        type:Boolean,
        default:false
    }


},{timestamps:true})

module.exports = new mongoose.model("User",userSchema)