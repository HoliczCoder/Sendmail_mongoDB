import { Router } from "express";
import { Request, Response } from "express";
import { authPage, authCourse, authUser } from "../middleware/basicAuth";

const router = Router();
router.get(
  "/get_list",
  authUser,
  authPage(["ADM", "MOD"]),
  (req, res, next) => {
    res.json({
      res: "get list student",
    });
  }
);

router.get("/:number", authUser, authCourse, (req, res, next) => {
  res.json({
    res: "you have accessed to this course",
  });
});

export default router;
