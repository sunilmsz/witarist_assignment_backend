const express = require("express")
const router = express.Router();
const todoRouter = require('./todoRouter');
const userRouter = require('./userRouter')

router.use('/users',userRouter)
router.use("/todos",todoRouter)

module.exports = router;