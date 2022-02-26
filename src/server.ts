import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

//https://git.heroku.com/murmuring-wildwood-82188.git

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! SHUTTING DOWN");
  console.log(err.name, err.message);
  process.exit(1);
});

import mongoose from "mongoose";

import { app, httpServer } from "./";
import { AppRouter } from "./AppRouter";

const DB: any = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected successfully");
  })
  .catch((err) => console.log("error"));

app.use(AppRouter.getInstance());

/*const server = app.listen(2000, () => {
  console.log("app running on port 2000");
});*/

const server = httpServer.listen(4000, "0.0.0.0", () => {
  console.log("app running on port 4000");
});

process.on("unhandledRejection", (err: any) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});