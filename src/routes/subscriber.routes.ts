import { Router } from "express";
import { Request, Response } from "express";
import {
  createSubscriber,
  getSubscriber,
  deleteSubscriber,
  unsubscribe
} from "../controllers/subscriber.controller";
const router = Router();

router.get('/unsubscribe/:id/:categoryId', unsubscribe)

router.post("/", createSubscriber);

router.get("/", getSubscriber);

router.delete("/", deleteSubscriber);


export default router;
