const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,'/public')));

http.listen(PORT,()=>{
    console.log(`listening on  http://localhost:${PORT}`)
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'));
})

io.on('connection',(socket)=>{
     console.log('connected');
    //  NOTE WE HAVE TO CONNECTED TO THE CLIENT
    socket.on('user_join',(x)=>{
        socket.username = x;
        socket.broadcast.emit('new_user',x)
    })
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message1',msg)
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user_left',socket.username)
    })
})