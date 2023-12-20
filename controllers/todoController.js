const mongoose = require('mongoose');
const todoModel = require("../models/todoModel")

const createTodo = async (req, res) => {
    try {
        const {content,category,priority=10} = req.body;
        const userId = req.userData._id
        const data = await todoModel.create({userId,content,category,priority})
        res.status(201).send({ staus: true, msg: "Created",data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}

const getTodos = async function (req, res) {
    try {
       
       
    }
    catch (err) {
        res.status(500).send({ status: true, msg: err.message })
    }
}


const updateTodos = async function (req, res) {
    try {
        const {todoId,content,category,priority,isCompleted,isArchived} = req.body;
        const toUpdate  = {}
        const userId = req.userData._id;
        const todo = await todoModel.findOne({_id:todoId,userId});
        if(content) { toUpdate.content = content};
        if(priority) { toUpdate.priority = priority}
        if(isCompleted ) { toUpdate.isCompleted = isCompleted}
        if(isArchived) {toUpdate.isArchived = isArchived}
        if(category) {toUpdate.category = category}
        console.log({userId,todoId,toUpdate})
        const data = await todoModel.findOneAndUpdate({userId,_id:todoId},toUpdate);

        res.status(201).send({ staus: true, msg: "done",data })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports=  {getTodos, createTodo, updateTodos};