import { NextFunction, Request, Response } from "express";
const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).json({
      message: "Forbidden: Access forbidden.",
    });
  }
  const authenticatedUserId = req.user._id;
  const userId = req.params.id;

  // Check if the authenticated user is the owner of the account
  if (authenticatedUserId !== userId) {
    return res.status(403).json({
      message: "Unauthorized: You are not allowed to perform this action",
    });
  }
  next();
};

export default authorizeUser;
