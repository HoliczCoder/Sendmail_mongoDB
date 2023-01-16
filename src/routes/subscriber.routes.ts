import { Router } from "express";
import { Request, Response } from "express";
import { createSubscriber } from "../controllers/subscriber.controller";
const router = Router();

router.post("/", createSubscriber);

router.get("/", (req: Request, res: Response) => {
  console.log("hell world");
});

export default router;
