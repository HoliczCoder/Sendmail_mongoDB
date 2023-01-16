let cors = require("cors");
import routes from "./routes/routes.index";
import mongoose from "mongoose";
import Server from "./server/Server";
var bodyParser = require("body-parser");

async function main() {
  require("dotenv").config();
  const result = await mongoose.connect(process.env.DATABASE_URL as string);
  const server = Server.init(Number(process.env.PORT));
  server.app.use(cors());
  server.app.use(bodyParser.json());
  server.app.use("/api", routes);
  server.start(() => {
    console.log(
      `suscessfully connect to http://localhost:${process.env.PORT}/api`
    );
  });
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
