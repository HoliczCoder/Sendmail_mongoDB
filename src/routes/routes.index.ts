import { Router } from "express";
import messageRouter from "./message.routes";
import subsciberRouter from "./subscriber.routes";

const routes = Router();

routes.use("/message", messageRouter)
routes.use("/subscriber", subsciberRouter);
export default routes;
