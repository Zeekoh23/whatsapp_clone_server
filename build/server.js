"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! SHUTTING DOWN");
    console.log(err.name, err.message);
    process.exit(1);
});
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require("./");
const AppRouter_1 = require("./AppRouter");
const DB = process.env.DATABASE_LOCAL;
mongoose_1.default
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
_1.app.use(AppRouter_1.AppRouter.getInstance());
/*const server = app.listen(2000, () => {
  console.log("app running on port 2000");
});*/
const server = _1.httpServer.listen(4000, "0.0.0.0", () => {
    console.log("app running on port 4000");
});
process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("UNHANDLED REJECTION! Shutting down...");
    server.close(() => {
        process.exit(1);
    });
});
