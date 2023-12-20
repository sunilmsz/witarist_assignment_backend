const dotenv = require("dotenv")
const express = require("express")
const app = express()

const http = require("http").Server(app)
const todoService = require('./services/todoService')
const mongoose = require("mongoose")
const frontendUrl = process.env.fornturl
const io = require("socket.io")(http,{
    cors:{
        origin:frontendUrl
    }
})

const cors = require("cors")

const router = require("./routes/index")

dotenv.config({ path: "./config.env" })
const DBKey = process.env.DB

app.use(cors({credentials:true,origin: frontendUrl}));
app.use(express.json());

// app.use(cookiParser())

app.use("/", router)

mongoose.connect(DBKey, { useNewurlParser: true })
    .then(() => { console.log("MoongoDB is connected") })
    .catch(err => console.log(err));

io.on("connection", (socket) => {
    console.log("connection established")
    socket.on("nuser-joined", (roomId) => {
        
        socket.to(roomId).emit("user-connected", peerId, socket.id)
    })

    socket.on("join",async (emailId)=>{
       await  socket.join(emailId);
       const todos = await todoService.getTodosByEmailId(emailId);
    //    console.log({todos,emailId})
       console.log(socket.rooms)
       socket.emit("todos",todos)
    })
    socket.on("getTodos",async emailId=> {
        const todos = await todoService.getTodosByEmailId(emailId);
       console.log({todos,emailId})
       socket.emit("todos",todos)
    })

    socket.on("get-other-todos",async (emailId)=>{
        await  socket.join(emailId);
        const todos = await todoService.getTodosByEmailId(emailId);
        console.log({todos,emailId})
        socket.emit("todos",todos)
    })

    socket.on("create-todo",async (emailId,todoId) => {
        console.log({emailId,todoId})
        console.log(socket.rooms)
        const todo = await todoService.getTodoById(todoId);
        io.in(emailId).emit("created",todo)
    })

    socket.on("delete-todo",(emailId,todoId)=> {
        console.log({todoId})
        console.log(socket.rooms)
        io.in(emailId).emit("deleted",todoId)
    })

    
    socket.on("edit-todo",async(emailId,todoId)=> {
        console.log({todoId})
        console.log(socket.rooms)
        const todo = await todoService.getTodoById(todoId);
        io.in(emailId).emit("edited",todo)
    })


})

const path = require('path');
const { getTodos } = require("./controllers/todoController")
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static('client/build'));
    // Handle React routing, return all requests to React app
    app.get('/*', function (req, res) {
        res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
}



http.listen(process.env.PORT, function () {
    console.log('Express app running on port ' + (process.env.PORT))
});