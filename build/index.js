"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
//algoexpert.io
const app = (0, express_1.default)();
exports.app = app;
var httpServer = http_1.default.createServer(app);
exports.httpServer = httpServer;
var io = require("socket.io")(httpServer);
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
//middleware
app.use(express_1.default.json());
var clients = {};
app.use((0, cors_1.default)());
//let users = {};
const connectedUser = new Set();
io.on("connection", (socket) => {
    /*let userId = socket.handshake.query.userId;
    if(!clients[userId] ) clients[userId] = [];
    clients[userId].push(socket.id);
    io.emit('online', userId);*/
    console.log("connected");
    console.log(socket.id, "has joined");
    connectedUser.add(socket.id);
    io.emit('connected-user', connectedUser.size);
    //socket.broadcast.emit("message", "online");
    socket.on("disconnect", () => {
        console.log("disconnected", socket.id);
        delete clients[socket.id];
        connectedUser.delete(socket.id);
        io.emit('connected-user', connectedUser.size);
        //io.emit("message", "Last seen " + Date.now);
    });
    /*socket.on("message", (data: any) => {
      console.log(data);
      socket.broadcast.emit("message-receive", data);
    });*/
    socket.on("typing", (type) => {
        console.log(type);
        io.emit("typing", type);
        let targetId = type.targetId;
        if (clients[targetId])
            clients[targetId].emit("typing", type);
    });
    socket.on("location", (loc) => {
        console.log(loc);
        io.emit("location", loc);
    });
    socket.on("signin", (id) => {
        console.log(id);
        clients[id] = socket; //allows the socketid to chat with another id
        clients[socket.id] = id;
        //io.sockets.emit('signin', id);
        console.log(clients);
    });
    /*socket.on("targetid", (id: any,) => {
      console.log(id);
      clients[id] = id;
      console.log(clients);
    });*/
    socket.on("message", (msg) => {
        console.log(msg);
        let targetId = msg.targetId;
        if (clients[targetId])
            clients[targetId].emit("message", msg);
    });
});
app.use("/chats", imageRoutes_1.default);
app.use("/uploads1", express_1.default.static("uploads"));
