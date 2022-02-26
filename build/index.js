"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! SHUTTING DOWN");
    console.log(err.name, err.message);
    process.exit(1);
});
const AppRouter_1 = require("./AppRouter");
const app = (0, express_1.default)();
var httpServer = http_1.default.createServer(app);
var io = require("socket.io")(httpServer);
//middleware
app.use(express_1.default.json());
var clients = {};
app.use((0, cors_1.default)());
const port = process.env.PORT || 5000;
const connectedUser = new Set();
io.on("connection", (socket) => {
    console.log("connected");
    console.log(socket.id, "has joined");
    //io.emit('connected-user', connectedUser.size);
    connectedUser.add(socket.id);
    socket.on("disconnect", () => {
        console.log("disconnected", socket.id);
        connectedUser.delete(socket.id);
        //io.emit('connected-user', connectedUser.size);
    });
    /*socket.on("message", (data: any) => {
      console.log(data);
      socket.broadcast.emit("message-receive", data);
    });*/
    socket.on("signin", (id) => {
        console.log(id);
        clients[id] = socket;
        console.log(clients);
    });
    socket.on("message", (msg) => {
        console.log(msg);
        let targetId = msg.targetId;
        if (clients[targetId])
            clients[targetId].emit("message", msg);
    });
});
//const DB: any = process.env.DATABASE_LOCAL;
/*mongoose
  .connect(DB, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected successfully");
  })
  .catch((err) => console.log("error"));*/
app.use(AppRouter_1.AppRouter.getInstance());
/*const server = app.listen(2000, () => {
  console.log("app running on port 2000");
});*/
app.route("/check").get((req, res) => {
    return res.json("Your app is working fine");
});
const server = httpServer.listen(port, "0.0.0.0", () => {
    console.log("app running on port 5000");
});
process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("UNHANDLED REJECTION! Shutting down...");
    server.close(() => {
        process.exit(1);
    });
});
/*server.listen(4000, "0.0.0.0", () => {
  console.log("server started");
});*/
//export { app, httpServer };
