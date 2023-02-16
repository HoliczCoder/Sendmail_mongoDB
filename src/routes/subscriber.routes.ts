import { Router } from "express";
import {
  createSubscriber,
  deleteSubscriber,
  getSubscriber,
  unsubscribe
} from "../controllers/subscriber.controller";
const router = Router();

router.get('/unsubscribe/:id/:categoryId', unsubscribe)

router.post("/", createSubscriber);

router.get("/", getSubscriber);

router.delete("/", deleteSubscriber);


export default router;
