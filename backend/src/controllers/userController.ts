import express from "express";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authenticateToken from "../utils/authenticateToken";
import { body, validationResult } from "express-validator";
import authorizeUser from "../utils/authorizeUser";

dotenv.config();

const router = express.Router();

// get all users

router.get("/", [
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

// get one specific user

router.get("/:id", [
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }
      res.json(user);
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

// create new user

router.post("/create", [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  body("bio")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = req.body;
      const { username, password } = user;
      const doesUsernameAllReadyExist = await UserModel.findOne({
        username: username,
      });
      if (doesUsernameAllReadyExist) {
        res.status(400).json({
          message: "Username all ready in use",
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserModel.create({
        username,
        password: hashedPassword,
      });

      res.status(200).json({
        success: true,
        message: " User created Successfully",
        user: newUser,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

// log in user

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      const { username, password } = user;
      const doesUserExist = await UserModel.findOne({
        username: username,
      });
      if (!doesUserExist) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }
      const validPassword = await bcrypt.compare(
        password,
        doesUserExist.password
      );
      if (!validPassword) {
        res.status(400).json({
          success: false,
          message: "wrong password",
        });
        return;
      }

      // Check if JWT_SECRET exists
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({
          message:
            "Server Error: JWT_SECRET not found in environment variables",
        });
      }

      // generate access token
      const token = jwt.sign(
        { _id: doesUserExist?._id, email: doesUserExist?.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({
        success: true,
        message: "login success",
        token: token,
        user: doesUserExist,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  }
);

// update user

router.put("/update/:id", [
  authenticateToken,
  authorizeUser,
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  body("bio")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await UserModel.findById(req.params.id);
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
          password: hashedPassword,
          avatar: req.body.avatar,
          bio: req.body.bio,
        },
        { new: true } // to return the updated document
      );
      res.status(200).json({
        success: true,
        message: "User updated Successfully",
        user: updatedUser,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

// delete user

router.delete("/delete/:id", [
  authenticateToken,
  authorizeUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: " User deleted Successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message.toString(),
      });
    }
  },
]);

export default router;
