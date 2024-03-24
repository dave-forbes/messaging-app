import express from "express";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user";
const router = express.Router();

// get all users

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// get one specific user

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// create new user

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

// update user

router.put(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

// delete user

router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

export default router;
