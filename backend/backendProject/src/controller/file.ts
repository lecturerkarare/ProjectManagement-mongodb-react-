import { NextFunction, Request, Response } from "express";
import {FileService } from "../services/file";

const FileController = {
  createFile(req: Request, res: Response, next: NextFunction) {
    FileService.CreateFile(req, res, next);
  },

  getAllFiles(req: Request, res: Response, next: NextFunction) {
    FileService.getAllFilesByProjectId(req, res, next);
  },
  getAllDocuments(req: Request, res: Response, next: NextFunction) {
    FileService.getAllDocuments(req, res, next);
  },
 
 
  deleteFile(req: Request, res: Response, next: NextFunction) {
    FileService.deleteFile(req, res, next);
  },
 
 
};
export const {
  getAllFiles,
  createFile,
  deleteFile,
  getAllDocuments
  
} = FileController;
