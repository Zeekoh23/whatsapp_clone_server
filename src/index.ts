import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";

const app = express();

var httpServer = http.createServer(app);
var io = require("socket.io")(httpServer);

import imagerouter from "./routes/imageRoutes";

//middleware
app.use(express.json());
var clients: any = {};
app.use(cors());

const connectedUser = new Set();

io.on("connection", (socket: any) => {
  console.log("connected");
  console.log(socket.id, "has joined");

  connectedUser.add(socket.id);
  io.emit("connected-user", connectedUser.size);

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
    delete clients[socket.id];
    connectedUser.delete(socket.id);
    io.emit("connected-user", connectedUser.size);
  });

  socket.on("typing", (type: any) => {
    console.log(type);
    io.emit("typing", type);
    let targetId = type.targetId;
    if (clients[targetId]) clients[targetId].emit("typing", type);
  });
  socket.on("location", (loc: any) => {
    console.log(loc);
    io.emit("location", loc);
  });

  socket.on("signin", (id: any) => {
    console.log(id);

    clients[id] = socket; //allows the socketid to chat with another id
    clients[socket.id] = id;

    console.log(clients);
  });

  socket.on("message", (msg: any) => {
    console.log(msg);
    let targetId = msg.targetId;
    if (clients[targetId]) clients[targetId].emit("message", msg);
  });
});

app.use("/chats", imagerouter);
app.use("/uploads1", express.static("uploads"));

export { app, httpServer };
