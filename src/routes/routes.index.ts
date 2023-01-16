import { Router } from "express";
import { Request, Response } from "express";
import subsciberRouter from "./subscriber.routes";

const routes = Router();

// routes.get("/", (req: Request, res: Response) => {
//   console.log("res",res);
//   res.json({
//     hello: "hello world",
//   });
// });

routes.use("/subscriber", subsciberRouter);
export default routes;
