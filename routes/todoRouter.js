const express = require("express")
const router = express.Router();
const {createTodo,getTodos,updateTodos} = require('../controllers/todoController');
const {authentication} = require('../middleware/auth')

router.post('/',authentication,createTodo);
router.put('/',authentication,updateTodos);

module.exports = router;