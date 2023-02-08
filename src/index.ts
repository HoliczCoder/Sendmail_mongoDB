let cors = require("cors");
import routes from "./routes/routes.index";
import mongoose from "mongoose";
import Server from "./server/Server";
var bodyParser = require("body-parser");
import { executableCron } from "./functions/cronJobs";
import express, { Request, Response } from "express";

async function main() {
  require("dotenv").config();
  const result = await mongoose.connect(process.env.DATABASE_URL as string);
  const server = Server.init(Number(process.env.PORT));
  //
  server.app.use(cors());
  server.app.use(bodyParser.json());
  server.app.use(express.static("public"));
  server.app.set("views", __dirname + "/views");
  server.app.set("view engine", "ejs");
  // just testing, dont mind it
  server.app.get("/", (req: Request, res: Response) => {
    res.render("index", { title: "Hey", message: "Hello there!" });
  });
  //
  server.app.use("/api", routes);
  server.start(() => {
    console.log(
      `suscessfully connect to http://localhost:${process.env.PORT}/api`
    );
  });
  // execute cron
  executableCron();
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
