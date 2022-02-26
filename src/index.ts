import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";

import { AppRouter } from "./AppRouter";

const app = express();

var httpServer = http.createServer(app);
var io = require("socket.io")(httpServer);

//middleware
app.use(express.json());
var clients: any = {};
app.use(cors());

const port: any = process.env.PORT || 5000;

const connectedUser = new Set();

io.on("connection", (socket: any) => {
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
  socket.on("signin", (id: any) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });
  socket.on("message", (msg: any) => {
    console.log(msg);
    let targetId = msg.targetId;
    if (clients[targetId]) clients[targetId].emit("message", msg);
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

app.use(AppRouter.getInstance());

/*const server = app.listen(2000, () => {
  console.log("app running on port 2000");
});*/

app.route("/check").get((req: Request, res: Response) => {
  return res.json("Your app is working fine");
});

httpServer.listen(port, "0.0.0.0", () => {
  console.log("app running on port 5000");
});

/*process.on("unhandledRejection", (err: any) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});*/

/*server.listen(4000, "0.0.0.0", () => {
  console.log("server started");
});*/

//export { app, httpServer };
