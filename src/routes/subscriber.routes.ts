import { Router } from "express";
import { Request, Response } from "express";
import {
  createSubscriber,
  getSubscriber,
} from "../controllers/subscriber.controller";
const router = Router();

router.post("/", createSubscriber);

router.get("/", getSubscriber);

export default router;
