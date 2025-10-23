import { NextFunction, Request, Response } from "express";
import { FaqService } from "../services/faq";
const FaqController = {
  createFaq(req: Request, res: Response, next: NextFunction) {
    FaqService.CreatFaq(req, res, next);
  },

  getAllFaq(req: Request, res: Response, next: NextFunction) {
    FaqService.getAllFaqs(req, res, next);
  },
 
  UpdateFaq(req: Request, res: Response, next: NextFunction) {
    FaqService.updateFaq(req, res, next);
  },
  deleteFaq(req: Request, res: Response, next: NextFunction) {
    FaqService.deleteFaq(req, res, next);
  },
  getFaqById(req: Request, res: Response, next: NextFunction) {
    FaqService.getFaqById(req, res, next);
  },
 
};
export const {
  createFaq,
  getAllFaq,
  getFaqById,
  deleteFaq,
  UpdateFaq
  
} = FaqController;
