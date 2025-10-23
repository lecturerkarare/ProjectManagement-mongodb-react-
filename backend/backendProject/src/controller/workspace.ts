import { NextFunction, Request, Response } from "express";
import { WorkspaceService } from "../services/workspace";

const WorkspaceController = {
  CreateWorkspace(req: Request, res: Response, next: NextFunction) {
    WorkspaceService.CreateWorkspace(req, res, next);
  },

  getAllWorkspace(req: Request, res: Response, next: NextFunction) {
    WorkspaceService.getAllWorkspaces(req, res, next);
  },

  UpdateWorkspace(req: Request, res: Response, next: NextFunction) {
    WorkspaceService.UpdateWorkspace(req, res, next);
  },
  deleteWorkspace(req: Request, res: Response, next: NextFunction) {
    WorkspaceService.deleteWorkspace(req, res, next);
  },
  getWorkspaceById(req: Request, res: Response, next: NextFunction) {
    WorkspaceService.getWorkspaceById(req, res, next);
  },
  AddmemberToWorkspace(req: Request, res: Response, next: NextFunction) {
    WorkspaceService.addmembersToworkspace(req, res, next);
  },
};
export const {
  CreateWorkspace,
  getAllWorkspace,
  getWorkspaceById,
  deleteWorkspace,
  UpdateWorkspace,
  AddmemberToWorkspace,
} = WorkspaceController;
