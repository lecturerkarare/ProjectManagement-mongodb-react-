import { NextFunction, Request, Response } from "express";
import { FeedBackService } from "../services/feedback";

const FeedbackController = {
  createFeedback(req: Request, res: Response, next: NextFunction) {
    FeedBackService.CreateFeedback(req, res, next);
  },

  getAllfeedback(req: Request, res: Response, next: NextFunction) {
    FeedBackService.getAllFeedBacks(req, res, next);
  },
 
  updateFeedBack(req: Request, res: Response, next: NextFunction) {
    FeedBackService.updateComment(req, res, next);
  },
  deleteFeedback(req: Request, res: Response, next: NextFunction) {
    FeedBackService.deleteFeedback(req, res, next);
  },
  getFeedbackById(req: Request, res: Response, next: NextFunction) {
    FeedBackService.getFeedBackById(req, res, next);
  },
 
};
export const {
 getAllfeedback,
 deleteFeedback,
 updateFeedBack,
 getFeedbackById,
 createFeedback
} = FeedbackController;
