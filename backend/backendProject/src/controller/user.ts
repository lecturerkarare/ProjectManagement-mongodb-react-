import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user";

const UserController = {
  getAllUsers(req: Request, res: Response, next: NextFunction) {
    UserService.getAllUsers(req, res, next);
  },

  updateUser(req: Request, res: Response, next: NextFunction) {
    UserService.updateUser(req, res, next);
  },
  deleteUser(req: Request, res: Response, next: NextFunction) {
    UserService.deleteUser(req, res, next);
  },
  getUserById(req: Request, res: Response, next: NextFunction) {
    UserService.getUserById(req, res, next);
  },
  AssignUserRole(req: Request, res: Response, next: NextFunction) {
    UserService.AssignRole(req, res, next);
  },
  UnssignUserRole(req: Request, res: Response, next: NextFunction) {
    UserService.UnAssignRole(req, res, next);
  },
};
export const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  AssignUserRole,
  UnssignUserRole,
} = UserController;
