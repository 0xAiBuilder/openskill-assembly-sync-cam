const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require('cors');


app.use(cors());
const server = http.createServer(app);


const fs = require('fs');

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connect: ${socket.id}`);
    socket.on("send_message", (data) => {
       socket.broadcast.emit("receive_message", data);
    });

    socket.on("join_room", (data) => {
       socket.join(data);
        //console.log(data)
    });

    socket.on("to_message", (data) => {
       socket.to(data.room).emit("receive_message", data);
    });

    //socket.on('savePhoto', (dataURL) => {
    //   const imageBuffer = new Buffer.from(dataURL.split(',')[1], 'base64');
    //   fs.writeFileSync('photo.jpeg', imageBuffer);
    //});

});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});