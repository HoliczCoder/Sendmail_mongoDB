import { Request, Response, NextFunction } from "express";

export const authPage = (permisson: Array<String>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body;
    if (!role) {
      return res.status(403).json({
        res: "you need to sign in",
      });
    }
    if (!permisson.includes(role)) {
      return res.status(401).json({
        res: "you dont have permisson",
      });
    }
    next();
  };
};

