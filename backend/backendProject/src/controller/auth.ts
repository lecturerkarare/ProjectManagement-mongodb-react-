import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth";

 const AuthController = {
    login(req: Request, res: Response, next:NextFunction) {
        AuthService.login(req, res,next);
      },


      
  signUp(req: Request, res: Response, next:NextFunction) {
    AuthService.signUp(req, res,next);
  },
  changedPassword(req: Request, res: Response, next:NextFunction) {
    AuthService.changePassword(req, res, next);
  }
 
 
};
export const {login,signUp,changedPassword} =AuthController