import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/task";

const TaskController = {
  createTask(req: Request, res: Response, next: NextFunction) {
    TaskService.CreateTask(req, res, next);
  },

  getAllMyTasks(req: Request, res: Response, next: NextFunction) {
    TaskService.getTasksAssignedTOme(req, res, next);
  },
  getAllTasks(req: Request, res: Response, next: NextFunction){
    TaskService.getAllTasks(req, res, next);
  },

  UpdateTask(req: Request, res: Response, next: NextFunction) {
    TaskService.updateTask(req, res, next);
  },
  deleteTask(req: Request, res: Response, next: NextFunction) {
    TaskService.deleteTask(req, res, next);
  },
  getTaskById(req: Request, res: Response, next: NextFunction) {
    TaskService.getTaskById(req, res, next);
  },
  AssignTask(req: Request, res: Response, next: NextFunction) {
    TaskService.AssignTask(req, res, next);
  },
};
export const {
  createTask,
  getAllMyTasks,
  getAllTasks,
  getTaskById,
  deleteTask,
  UpdateTask,
  AssignTask,
} = TaskController;
