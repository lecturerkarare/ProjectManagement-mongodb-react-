import { NextFunction, Request, Response } from "express";
import { ProjectService } from "../services/project";
import { Task } from "../model/task";

const ProjectController = {
  CreateProject(req: Request, res: Response, next: NextFunction) {
    ProjectService.CreateProject(req, res, next);
  },

  getAllProject(req: Request, res: Response, next: NextFunction) {
    ProjectService.getAllProjects(req, res, next);
  },
  getAllProjectsAssigneTome(req: Request, res: Response, next: NextFunction) {
    ProjectService.getProjectsAssignedTOme(req, res, next);
  },

  UpdateProject(req: Request, res: Response, next: NextFunction) {
    ProjectService.updateProject(req, res, next);
  },
  deleteProject(req: Request, res: Response, next: NextFunction) {
    ProjectService.deleteProject(req, res, next);
  },
  getProjectById(req: Request, res: Response, next: NextFunction) {
    ProjectService.getProjectById(req, res, next);
  },
  AssignProject(req: Request, res: Response, next: NextFunction) {
    ProjectService.AssignProject(req, res, next);
  },
  getAllProjectsByWorkspaceById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    ProjectService.getAllProjectsByWorkspaceById(req, res, next);
  },
  getAllCompletedProject(req: Request, res: Response, next: NextFunction) {
    ProjectService.getAllCompletedProjects(req, res, next);
  },
  getAllUsersProject(req: Request, res: Response, next: NextFunction) {
  ProjectController.getAllUsersProject(req, res, next);
  },
  getAllOnholdProjects(req: Request, res: Response, next: NextFunction) {
    ProjectService.getAllOnHoldProjects(req, res, next);
  },
  getAllOngoingProjects(req: Request, res: Response, next: NextFunction) {
    ProjectService.getAllOngoingProjects(req, res, next);
  },
  getAllPendingProjects(req: Request, res: Response, next: NextFunction) {
    ProjectService.getAllPedingProjects(req, res, next);
  },
 
   getAllProjectStatus(req: Request, res: Response, next: NextFunction) {
    ProjectService.getAllProjectsByStatus(req, res, next);
  },

  updateProjectPercentage(req: Request, res: Response, next: NextFunction){
    ProjectService.updateProjectPercentages(req,res,next);
  },

};
export const {
  CreateProject,
  UpdateProject,
  deleteProject,
  getAllProject,
  getProjectById,
  AssignProject,
  getAllProjectsAssigneTome,
  getAllProjectsByWorkspaceById,
  getAllOnholdProjects,
  getAllCompletedProject,
  getAllOngoingProjects,
  getAllPendingProjects,
  getAllUsersProject,
  updateProjectPercentage,
  getAllProjectStatus
} = ProjectController;
