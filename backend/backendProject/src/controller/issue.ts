import { NextFunction, Request, Response } from "express";
import { IssueService } from "../services/issue";

const IssueController = {
  CreateIssue(req: Request, res: Response, next: NextFunction) {
    IssueService.CreateIssue(req, res, next);
  },

  getAllIssues(req: Request, res: Response, next: NextFunction) {
    IssueService.getAllIssues(req, res, next);
  },
  getAllIssuesAssigneTome(req: Request, res: Response, next: NextFunction) {
    IssueService.getIssuesAssignedToMe(req, res, next);
  },

  UpdateIssue(req: Request, res: Response, next: NextFunction) {
    IssueService.updateIssues(req, res, next);
  },
  deleteIssue(req: Request, res: Response, next: NextFunction) {
    IssueService.deleteIssue(req, res, next);
  },
  getIssueById(req: Request, res: Response, next: NextFunction) {
    IssueService.getIssueById(req, res, next);
  },
 

};
export const {
  CreateIssue,
  UpdateIssue,
  deleteIssue,
  getAllIssues,
  getIssueById,
  getAllIssuesAssigneTome,
} = IssueController;
