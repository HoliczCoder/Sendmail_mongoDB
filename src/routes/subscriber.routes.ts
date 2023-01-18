import { Router } from "express";
import { Request, Response } from "express";
import {
  createSubscriber,
  getSubscriber,
  deleteSubscriber,
} from "../controllers/subscriber.controller";
const router = Router();

router.post("/", createSubscriber);

router.get("/", getSubscriber);

router.delete("/", deleteSubscriber);

export default router;
