
const todoModel = require('../models/todoModel')
const userModel = require('../models/userModel')
const getTodosByEmailId = async (emailId) => {

    const user= await userModel.findOne({email:emailId}).lean();
    if(!user) return null;
    const todos = await todoModel.find({userId:user._id,isArchived:false}).sort({priority:-1}).lean();
    if(todos.length==0) return null;
    return todos;
}

const getTodoById = async (todoId) => {
    const todos = await todoModel.findOne({_id:todoId,isArchived:false}).lean();
    return todos;
}

module.exports = {getTodosByEmailId,getTodoById}