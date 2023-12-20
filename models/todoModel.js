const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const todoSchema = new mongoose.Schema({
    userId :{
        type : ObjectId,
        ref: "users",
        required:true
    },
    category : {
        type: String
    },
    content : {
        type:String
    },
    isCompleted : {
        type:Boolean,
        default:false
    },
    priority : {
        type :Number,
        default:10,
        enum : [10,30,50]  
        // 50 -> High  30-> medium , 10 -> low
    },
    isArchived:{
        type:Boolean,
        default:false
    }


},{timestamps:true})

module.exports = new mongoose.model("Todo",todoSchema)