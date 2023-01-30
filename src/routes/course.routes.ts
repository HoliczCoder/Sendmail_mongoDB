import { Router } from "express";
import { Request, Response } from "express";
import { authPage, authCourse } from "../middleware/basicAuth";

const router = Router();
router.get("/get_list", authPage(["ADM", "MOD"]), (req, res, next) => {
  res.json({
    res: "get list student",
  });
});

router.get("/:number", authCourse, (req, res, next) => {
  res.json({
    res: "you have accessed to this course",
  });
});

export default router;
