import { Request, Response, NextFunction } from "express";
import { User as UserType } from "../types/user";
import { Task } from "../model/task";
import { User } from "../model/user";
import mongoose from "mongoose";
import { Project } from "../model/project";
import { Ipriority, Status } from "../types";
import nodemailer from "nodemailer";
import cron from "node-cron";
import { Issue } from "../model/Issue";
export const TaskService = {
  async CreateTask(req: Request, res: Response, next: NextFunction) {
    try {
      let { name, dueDate, startDate,description,  endDate,issue } = req.body;
      const checkExisting = await Task.findOne({ name });
      if (checkExisting) {
        return res
          .status(400)
          .json({ msg: "Task with that name already exists" });
      } else {
        const user = req.user as UserType;
        const issueId = req.params.issueId;
     
         let issue =await  Issue.findById(issueId)
       
        
        if (!issue) {
          return res.status(400).json({ msg: "Issue not found" });
        }
       
        let task = await Task.create({
          name,
          startDate,
          endDate,
          status: Status.NOTSTARTED,
          dueDate,
          description,
          assignedTo:user?._id,
          priority: Ipriority.LOW,
          user: user?._id,
          issue: issue?._id,
        });
        let result = await task.save();

        if (result)
          return res
            .status(200)
            .json({ msg: "Successfully created Task", result });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getTasksAssignedTOme(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserType;

      const result = await Task.find({
        assignedTo: mongoose.Types.ObjectId(user?._id),
      }).populate("-password")
      .sort({ createdAt: -1 });
      console.log(result);
      if (result)
        return res
          .status(200)
          .json({ message: "Tasks retrieved successfully", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      
      
        const result = await Task.find({})
          .populate("assignedTo", "-password")
          .populate("user")
          .populate('Issue')
          .sort({ createdAt: -1 })
          .exec();
        if (result)
          return res
            .status(200)
            .json({ message: "Tasks retrieved successfully", result });
      
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) return res.status(404).json({ message: "Task not found" });
      res.status(200).json({ message: "Task updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error in updating Project" });
    }
    next();
  },

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndRemove({ _id: id });
      if (task)
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await Task.findById(id)
        .populate("project")
        .populate("assignedTo", "-password")
        .populate("user", "-password")
        .select("-password")
        .exec();

      if (!result) return res.status(404).json({ message: " Task not found" });
      res.status(200).json({ msg: "successfully retrieved Task ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async assignTaskToUser(taskId: string, userId: string): Promise<void> {
    try {
      const task = await Task.findById(taskId);

      if (!task) {
        throw new Error("Task not found");
      }

      const user = await User.findById(userId);

      if (user) {
        task.assignedTo = user._id;
      const result = await task.save();
      if (result) {
        let PASSWORD = "nwfbopmzfxclbkup";
        const transporter = nodemailer.createTransport({
          service: "gmail",
          secure: false,
          auth: {
            user: "devconnector254@gmail.com",
            pass: `${PASSWORD}`,
          },
        });
        const mailOptions = {
          from: "devconnector254@gmail.com",
           to: user.email,
          subject: `Reminder: Task Asssignment`,
          text: `Task "${task.name}"  has been assigned to you,  Please confirm .`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        console.log("Email sent");
      } else {
        console.log("email not sent");
      }
    }

     
    
    } catch (error) {
      throw new Error("Failed to assign Task to user");
    }
  },
  async AssignTask(req: Request, res: Response, next: NextFunction) {
    const taskId = req.params.id;
    const userId = req.body.userId;

    try {
      await this.assignTaskToUser(taskId, userId);

      return res
        .status(200)
        .send({ message: "Task assigned to user successfully" });
    } catch (error) {
      res.status(500).send({ message: "Failed to assign Task to user" });
    }
    next();
  },
};
function SendTaskDueDatesReminders(req: Request) {
  try {
   
    cron.schedule("0 0 * * *", async () => {
      const dueDateReminderPeriod = 1; // in days
      const dueDateReminder = new Date();
      dueDateReminder.setDate(
        dueDateReminder.getDate() + dueDateReminderPeriod
      );
      const user = req.user as UserType;

      const dueTasks = await Task.find({
        dueDate: { $lte: dueDateReminder },
        user: user?._id,
      });

      for (const task of dueTasks) {
        let PASSWORD = "nwfbopmzfxclbkup";
        const transporter = nodemailer.createTransport({
          service: "gmail",
          secure: false,
          auth: {
            user: "devconnector254@gmail.com",
            pass: `${PASSWORD}`,
          },
        });
        const mailOptions = {
          from: "devconnector254@gmail.com",
          to: user.email,
          subject: `Reminder: Task "${task.name}" is due soon`,
          text: `Task "${task.name}" is due on ${task.dueDate}. Please complete it before then.`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export const sendTaskReminder = async (event: any) => {
  SendTaskDueDatesReminders(event);
}
