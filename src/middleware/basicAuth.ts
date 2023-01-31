import { Request, Response, NextFunction } from "express";

// example users
const users = [
  { id: 1, name: "CR7", courses: [1, 2, 3], role: "ADM" },
  { id: 2, name: "M10", courses: [1, 2, 8], role: "MOD" },
  { id: 3, name: "RN9", courses: [1, 7, 4], role: "STU" },
];

function findUser(userId: number) {
  return users.find((user) => user.id === userId);
}

const authUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(403).json({
      res: "you need to sign in",
    });
  }
  const user = findUser(userId);
  if (!user) {
    return res.status(403).json("You need to sign in");
  }
  req.user = user;
  next();
};

export const authPage = (permisson: Array<String>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const role = user?.role;
    if (role) {
      if (!permisson.includes(role)) {
        return res.status(401).json({
          res: "you dont have permisson",
        });
      }
    }
    next();
  };
};

export const authCourse = (req: Request, res: Response, next: NextFunction) => {
  const { number } = req.params;
  const user = req.user;
  const courses = user?.courses;
  if (courses) {
    if (!courses.includes(+number)) {
      return res.status(401).json({
        res: "course not found",
      });
    }
  }
  next();
};
