var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
import routes from "./routes";
import mongoose from "mongoose";
import Server from "./server/Server";
import bodyParser = require("body-parser");
import sendQueue from "./queue/producer";
import receiveQueue from "./queue/consumer";

async function main() {
  require("dotenv").config();
  mongoose.connect(process.env.DATABASE_URL as string);
  const server = Server.init(Number(process.env.PORT));
  server.app.use(cors());
  server.app.use(bodyParser.json());
  server.app.use("/api", routes);
  server.start(() => {
    console.log(
      `suscessfully connect to http://localhost:${process.env.PORT}/api`
    );
  });
  // receiveQueue();
  const msg = process.argv.slice(2).join('') || 'Hello'
  // console.log(msg);
  sendQueue({ msg })
}

main()
  .then(async () => {
    // await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    // await prisma.$disconnect();
    console.log(e);
    process.exit(1);
  });
