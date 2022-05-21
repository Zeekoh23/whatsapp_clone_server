import express, { Request, Response } from "express";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! SHUTTING DOWN");
  console.log(err.name, err.message);
  process.exit(1);
});

import { app, httpServer } from "./";
import { AppRouter } from "./AppRouter";

const port: any = process.env.PORT || 5000;

app.use(AppRouter.getInstance());

app.route("/check").get((req: Request, res: Response) => {
  return res.json("Your app is working fine");
});

const server: any = httpServer.listen(port, "0.0.0.0", () => {
  console.log("app running on port 5000");
});

process.on("unhandledRejection", (err: any) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
