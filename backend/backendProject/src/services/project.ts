import { Request, Response, NextFunction } from "express";
import { User as UserType } from "../types/user";
import nodemailer from "nodemailer";
import cron from "node-cron";
import { Project } from "../model/project";
import mongoose from "mongoose";
import { Status } from "../types/project";
import { User } from "../model/user";
import { Workspace } from "../model/workspace";
import { Task } from "../model/task";

export const ProjectService = {
  async CreateProject(req: Request, res: Response, next: NextFunction) {
    try {
      let {
        title,
        description,
        startDate,
        endDate,
        assignedTo,
        status,
       
      } = req.body;
       
    if (status && !Object.values(Status).includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

      const checkExisting = await Project.findOne({ title: title });
      if (checkExisting) {
        return res
          .status(400)
          .json({ msg: "Project with that name already exists" });
      } else {
        const user = req.user as UserType;
       
        
  
        let project = await Project.create({
          title,
          description,
          startDate,
          endDate,
          status,
          user: user?._id,
          assignedTo: assignedTo || null,
         
        });
        let result = await project.save();
  
        if (result)
          return res
            .status(200)
            .json({ msg: "Successfully created project", result });
      }
    } catch (err) {
      console.log("Error creating project:", err);
      res.status(500).json({ error: err });
    }
    next();
  }
  ,
  
  async getAllProjects(req: Request, res: Response, next: NextFunction) {
    try {
     
      const result = await Project.find({})
        .populate("assignedTo", "-password")
        .populate("user", "-password")
         .populate("files")
        .sort({ createdAt: -1 })
        .exec();
      if (result)
        return res
          .status(200)
          .json({ message: "Projects retrieved successfully", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async getProjectsAssignedTOme(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user as UserType;

      const result = await Project.find({
        assignedTo: mongoose.Types.ObjectId(user?._id),
      })
        .populate("user", "-password")
        .populate("assignedTo", "-password")
        .sort({ createdAt: -1 });
      if (result)
        return res
          .status(200)
          .json({ message: "Projects retrieved successfully", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async getAllProjectsByWorkspaceById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { workspaceId } = req.params;
      let workspace = await Workspace.findById(workspaceId);
      if (workspace) {
        const result = await Project.find({ workspace: workspace.id })
          .populate("assignedTo", "-password")
          .populate("task")
          .populate("user", "-password")
          .sort({ createdAt: -1 })
          .exec();

        if (result)
          return res
            .status(200)
            .json({ message: "Projects retrieved successfully", result });
      } else {
        return res.status(404).json({ message: "Projects not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
 async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedProject = await Project.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      })
        .populate("assignedTo", "-password")
        .populate("user", "-password");

      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json({ message: "Project updated successfully", result: updatedProject });
    } catch (error) {
      res.status(500).json({ message: "Error in updating Project" });
    }
    next();
  },


  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await Project.findByIdAndRemove({ _id: id });
      if (user)
        return res
          .status(200)
          .json({ message: "Project deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await Project.findById(id)
        .populate("user", "-password")
        .populate("assignedTo", "-password")
        .populate("task")
        .exec();

      if (!result)
        return res.status(404).json({ message: " Project not found" });
      res.status(200).json({ msg: "successfully retrieved Project ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async assignProjectToUser(projectId: string, userId: string): Promise<void> {
    try {
      const project = await Project.findById(projectId);

      if (!project) {
        throw new Error("Project not found");
      }

      const user = await User.findById(userId);
      if (user) {
        project.assignedTo = user._id;
      await project.save();
    
    }
    } catch (error) {
      console.log(error);
    }
  },
  async AssignProject(req: Request, res: Response, next: NextFunction) {
    const projectId = req.params.id;
    const userId = req.body.userId;

    try {
      await this.assignProjectToUser(projectId, userId);

      return res
        .status(200)
        .send({ message: "Project assigned to user successfully" });
    } catch (error) {
      console.log(error);
      //res.status(500).send({ message: "Failed to assign project to user" });
    }
    next();
  },

  async getAllCompletedProjects(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await Project.find({ status: Status.COMPLETED }).sort({
        createdAt: -1,
      });

      if (result)
        return res.status(200).json({
          message: " Completed Projects retrieved successfully",
          result,
        });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async getAllPedingProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Project.find({ status: Status.NOTSTARTED }).sort({
        createdAt: -1,
      });

      if (result)
        return res.status(200).json({
          message: " Pending Projects retrieved successfully",
          result,
        });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async getAllOngoingProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Project.find({ status: Status.ONGOING }).sort({
        createdAt: -1,
      });

      if (result)
        return res.status(200).json({
          message: " Ongoing Projects retrieved successfully",
          result,
        });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async getAllOnHoldProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Project.find({ status: Status.ONHOLD }).sort({
        createdAt: -1,
      });

      if (result)
        return res.status(200).json({
          message: " Onhold Projects retrieved successfully",
          result,
        });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
async getAllProjectsByStatus(req: Request, res: Response, next: NextFunction) {
  try {
  
    const [completed_count, pending_count, ongoing_count, onhold_count, all_count] = await Promise.all([
      Project.countDocuments({ status: Status.COMPLETED }),
      Project.countDocuments({ status: Status.NOTSTARTED }),
      Project.countDocuments({ status: Status.ONGOING }),
      Project.countDocuments({ status: Status.ONHOLD }),
      Project.countDocuments({}),
    ]);

   
    return res.status(200).json({
      message: "Project counts retrieved successfully",
      result: {
        completed_count,
        pending_count,
        ongoing_count,
        onhold_count,
        all_count,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
  next();
},
  async getPercentageOfProjectBasedOnTaskCompleted(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { projectId } = req.params;
      let project = await Project.findById(projectId);
      const projectTasks = await Task.find({ project: project?.id });

      const completedTasksCount = projectTasks.filter(
        (task) => task.status === Status.COMPLETED
      ).length;
      const pendingTasksCount = projectTasks.filter(
        (task) => task.status == Status.NOTSTARTED
      ).length;

      const totalTasksCount = completedTasksCount + pendingTasksCount;
      const percentageCompleted =
        totalTasksCount === 0
          ? 0
          : Math.round((completedTasksCount / totalTasksCount) * 100);
      console.log(percentageCompleted);
      const percentagePending = 100 - percentageCompleted;
      res.status(200).json({
        percentageCompleted: percentageCompleted,
        percentagePending: percentagePending,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateProjectPercentages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    let project = await Project.findById(id);
    if (project) {
      const projectTasks = await Task.find({ project: project?.id });
      const completedTasksCount = projectTasks.filter(
        (task) => task.status === Status.COMPLETED
      ).length;
      const pendingTasksCount = projectTasks.filter(
        (task) => task.status !== Status.COMPLETED
      ).length;
      const totalTasksCount = completedTasksCount + pendingTasksCount;
      const percentageCompleted =
        totalTasksCount === 0
          ? 0
          : Math.round((completedTasksCount / totalTasksCount) * 100);
      const percentagePending = 100 - percentageCompleted;
      project.percentageCompleted = percentageCompleted;
      project.percentagePending = percentagePending;
      const result = await project.save();
      if (result)
        return res
          .status(200)
          .json({ msg: "Project percentage updated successfully", result });
      else return res.status(500).json({ msg: "Error while updating project" });
    }
  },
  //dashboard summary
  async dashboardSummary(req: Request, res: Response, next: NextFunction) {
    try {
      let totalProjects = await Project.find({}).countDocuments();
      let totalCompletedProjects = await Project.find({
        status: Status.COMPLETED,
      }).countDocuments();
      let totalOnholdProjects = await Project.find({
        status: Status.ONHOLD,
      }).countDocuments();
      let totalOngoingProjects = await Project.find({
        status: Status.ONGOING,
      }).countDocuments();

      let totalNotstartedProjects = await Project.find({
        status: Status.NOTSTARTED,
      }).countDocuments();
      let totalWorkspace = await Workspace.find({}).countDocuments();
      return {
        totalCompletedProjects,
        totalOngoingProjects,
        totalOnholdProjects,
        totalWorkspace,
        totalProjects,
        totalNotstartedProjects,
      };
    } catch (err) {
      console.log(err);
    }
  },
  async getUserDashboardSummary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user as UserType;
      let totalProjects = await Project.find({
        user: user._id,
      }).countDocuments();
      let totalCompletedProjects = await Project.find({
        user: user._id,
        status: Status.COMPLETED,
      }).countDocuments();
      let totalOnholdProjects = await Project.find({
        user: user._id,
        status: Status.ONHOLD,
      }).countDocuments();
      let totalOngoingProjects = await Project.find({
        user: user._id,
        status: Status.ONGOING,
      }).countDocuments();

      let totalWorkspace = await Workspace.find({}).countDocuments();
      return {
        totalCompletedProjects,
        totalOngoingProjects,
        totalOnholdProjects,
        totalWorkspace,
        totalProjects,
      };
    } catch (err) {
      console.log(err);
    }
  },
  async getUsersProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserType;
      const result = await Project.find({ user: user._id })
        .populate("assignedTo", "-password")
        .populate("task")
        .populate("user", "-password")
        .sort({ createdAt: -1 })
        .exec();

      if (result)
        return res
          .status(200)
          .json({ message: " User's Projects retrieved successfully", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};



export const sendProjectReminder = async (event: any) => {
  // SendprojectDueDatesReminders(event);
};
