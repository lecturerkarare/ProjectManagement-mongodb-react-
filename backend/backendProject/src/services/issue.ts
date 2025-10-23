import { Request, Response, NextFunction } from "express";
import { User as UserType } from "../types/user";

import { User } from "../model/user";
import mongoose, { FilterQuery, Types } from "mongoose";
import { Project } from "../model/project";
import { Ipriority, Status } from "../types";
import { Issue, IssueDocument } from "../model/Issue";


export const IssueService = {
  async CreateIssue(req: Request, res: Response, next: NextFunction) {
    try {

      let { title ,description, dueDate,project } = req.body;
      const checkExisting = await Issue.findOne({ title });
      if (checkExisting) {
        return res
          .status(400)
          .json({ msg: "Ticket  with that name already exists" });
      } else {
        const user = req.user as UserType;
        let projects;
        if (project) {
          projects = await Project.findById(project);
        }
        if (!projects) {
          return res.status(400).json({ msg: "Project not found" });
        }

        let issue = await Issue.create({
          title,
          dueDate,
          status: Status.NOTSTARTED,
          description,
          priority: Ipriority.LOW,
          createdBy: user?._id,
          assignedTo:user?._id,
          project: project?._id,
        });
        let result = await issue.save();

        if (result)
          return res
            .status(200)
            .json({ msg: "Successfully created an Issue", result });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getIssuesAssignedToMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserType;
  
      const result = await Issue.find({
        assignedTo: user?._id as FilterQuery<IssueDocument>['assignedTo']
      })
        .populate("assignedTo", "-password")
        .sort({ createdAt: -1 });
  
      if (result.length > 0) {
        return res.status(200).json({ message: "Issues retrieved successfully", result });
      } else {
        return res.status(404).json({ message: "No issues found for the user" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error:err});
    }
    next();
  },
  
  async getAllIssues(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Issue.find({})
        .populate("assignedTo", "-password")
        .populate("user")
        .populate("project")
        .sort({ createdAt: -1 })
        .exec();
      if (result)
        return res
          .status(200)
          .json({ message: "Issues retrieved successfully", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async updateIssues(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await Issue.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) return res.status(404).json({ message: "Issue not found" });
      res.status(200).json({ message: "Issue updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error in updating Project" });
    }
    next();
  },

  async deleteIssue(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      let issue = await Issue.findByIdAndRemove({ _id: id });
      if (issue)
        return res.status(200).json({ message: "Issue deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getIssueById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await Issue.findById(id)
        .populate("project")
        .populate("assignedTo", "-password")
        .populate("user", "-password")
        .select("-password")
        .exec();

      if (!result) return res.status(404).json({ message: " Issue not found" });
      res.status(200).json({ msg: "successfully retrieved Issue ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async assignIssueToUser(IssueId: string, userId: string): Promise<void> {
    try {
      const issue = await Issue.findById(IssueId);

      if (!issue) {
        throw new Error("Issue not found");
      }

      const user = await User.findById(userId);

      if (user) {
        issue!.assignedTo = user._id;
        const result = await issue.save();
        if (result) {
        // return  result.status(200).send({message:"Issue assigned to user successfully"})
        } else {
          console.log("email not sent");
        }
      }
    } catch (error) {
      throw new Error("Failed to assign Issue to user");
    }
  },
  async AssignIssue(req: Request, res: Response, next: NextFunction) {
    const IssueId = req.params.id;
    const userId = req.body.userId;

    try {
      await this.assignIssueToUser(IssueId, userId);

      return res
        .status(200)
        .send({ message: "Issue assigned to user successfully" });
    } catch (error) {
      res.status(500).send({ message: "Failed to assign Issue to user" });
    }
    next();
  },
};
;
