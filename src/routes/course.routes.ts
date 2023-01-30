import { Router } from "express";
import { Request, Response } from "express";
import { authPage } from "../middleware/basicAuth";

const router = Router();
router.get("/get_list", authPage(['ADM', 'MOD']) ,(req, res, next) => {
  res.json({
    res: "get list student",
  });
});

export default router;
