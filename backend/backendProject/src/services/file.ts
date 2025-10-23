import { Request, Response, NextFunction, response } from "express";
import { User as UserType } from "../types/user";
import { IComments as CommentType } from "../types/comment";

import { Comment } from "../model/comment";
import { Project } from "../model/project";
import { File } from "../model/file";
import multer from "multer";


export const FileService = {
    
    async CreateFile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as UserType;
            const { projectId } = req.params;
            const project = await Project.findById(projectId);
            console.log(project)
          if (req.file) {
           let  files = await File.create({
              name: req.file.originalname,
              path: req.file.path,
              file: req.file.buffer,
              uploadedBy: user?._id,
              project: project?._id,
            });
            const result = await files.save();
            if (result) {
                return res.status(200).json({ msg: 'Successfully uploaded File', result });
              }
          } else {
            return res.status(400).json({ error: 'No file uploaded' });
          }
      
       
        } catch (err) {
          res.status(500).json({ error: err });
        }
        next()
      },
      
    async getAllDocuments(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await File.find({}).populate("uploadedBy", "-password").populate('project')

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No files found." });
    }

    return res.status(200).json({
      message: "Files retrieved successfully",
      result,
    });
  } catch (err) {
    return res.status(500).json({ error: "An error occurred while fetching files", details: err });
  }
},

  async getAllFilesByProjectId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { projectId } = req.params;
      let project = await Project.findById(projectId);
      if (project) {
        const result = await File.find({ project: project.id }).populate(
          "uploadedBy","-password"
        );

        if (result)
          return res.status(200).json({
            message: `Files for ${projectId} retrieved successfully`,
            result,
          });
      } else {
        return res.status(404).json({ message: "Files not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },


  async deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
   
       const data= await File.findByIdAndRemove(projectId);
       if(data){
        return res.status(200).json({msg:"File deleted"})
       
      }
      else{
        return res.status(403).json({msg:"File not deleted"})
      }
      
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
};