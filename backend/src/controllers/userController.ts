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
      const user = req.body;
      const { username, password } = user;
      const doesUsernameAllReadyExist = await UserModel.findOne({
        username: username,
      });
      if (doesUsernameAllReadyExist) {
        res.status(400).json({
          status: 400,
          message: "Email all ready in use",
        });
        return;
      }

      const newUser = await UserModel.create({
        username,
        password,
      });

      res.status(200).json({
        status: 201,
        success: true,
        message: " User created Successfully",
        user: newUser,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
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
