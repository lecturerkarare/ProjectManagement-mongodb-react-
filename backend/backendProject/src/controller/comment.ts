import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/comments";

const CommentController = {
  createComment(req: Request, res: Response, next: NextFunction) {
    CommentService.CreateComment(req, res, next);
  },

  getAllCommentsByProjectId(req: Request, res: Response, next: NextFunction) {
    CommentService.getAllCommentsByModuleId(req, res, next);
  },
 
  UpdateComment(req: Request, res: Response, next: NextFunction) {
    CommentService.updateComment(req, res, next);
  },
  deleteComment(req: Request, res: Response, next: NextFunction) {
    CommentService.deleteComment(req, res, next);
  },
  getCommentById(req: Request, res: Response, next: NextFunction) {
    CommentService.getCommentById(req, res, next);
  },
 
};
export const {
  getAllCommentsByProjectId,
  getCommentById,
  UpdateComment,
  createComment,
  deleteComment,
  
} = CommentController;
