import { Request, Response, NextFunction } from "express";
import { User as UserType } from "../types/user";
import { Comment, TaskComment, ProjectComment, IssueComment } from "../model/comment"; 

import { Project } from "../model/project";
import { CommentType } from "../types/comment";
export const CommentService = {
  async CreateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { comment, type, task,project,issue } = req.body;
      const user = req.user as UserType;
  
      let comments;
  
      switch (type) {
        case CommentType.TASKCOMMENT:
          comments = await TaskComment.create({
            comment,
            type,
            commentedBy: user?._id,
            task,
          });
          break;
        case CommentType.PROJECTCOMMENT:
          comments = await ProjectComment.create({
            comment,
            type,
            commentedBy: user?._id,
            project
          });
          break;
        case CommentType.TICKETCOMMENT:
          comments = await IssueComment.create({
            comment,
            type,
            commentedBy: user?._id,
            issue
          });
          break;
        default:
          return res.status(400).json({ error: 'Invalid comment type' });
      }
  
      let result = await comments.save();
  
      if (result) {
        return res.status(200).json({ msg: "Successfully created comment", result });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getAllCommentsByModuleId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { moduleId } = req.params; 
  
      const result = await Comment.find({
        $or: [
          { task: moduleId, __t: "TaskComment" },
          { issue: moduleId, __t: "IssueComment" },
          { project: moduleId, __t: "ProjectComment" },
        ],
      }).populate("commentedBy", "-password");
  
      if (result.length > 0) {
        return res.status(200).json({
          message: `Comments for module ${moduleId} retrieved successfully`,
          result,
        });
      } else {
        return res.status(404).json({ message: "Comments not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  ,

  async getCommentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;
      const result = await Comment.findById(commentId).populate("commentedBy","-password");

      console.log(result);
      if (!result)
        return res.status(404).json({ message: " Comment not found" });
      res.status(200).json({ msg: "successfully retrieved Comment ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;

      let comment = await Comment.findByIdAndUpdate(commentId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!comment)
        return res.status(404).json({ message: "Comment not found" });
      res
        .status(200)
        .json({ message: "Comment updated successfully", comment });
    } catch (error) {
      res.status(500).json({ message: "Error in updating Comment" });
    }
    next();
  },

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;
      let findcommentedBy = await Comment.findById(commentId).populate(
        "commentedBy"
      );   
      const user = req.user as UserType;
      if (findcommentedBy?.commentedBy._id.equals(user._id)) {
       const data= await Comment.findByIdAndRemove(commentId);
       if(data){
        return res.status(200).json({msg:"Comment deleted"})
       }
  
      }
      else{
        return res.status(403).json({msg:"You do not have permission to delete this comment"})
      }
      
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
};
