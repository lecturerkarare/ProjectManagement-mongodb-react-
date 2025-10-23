import { Request, Response, NextFunction } from "express";
import { Workspace } from "../model/workspace";
import { workspaceActions } from "../types";
import { User as UserType } from '../types/user'
export const WorkspaceService = {
  async CreateWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      let { title, description} = req.body;
      const checkExsting = await Workspace.findOne({ title: title });
      if (checkExsting) {
        return res
          .status(400)
          .json({ msg: "Workspace with that name already exists" });
      } else {
        const user = req.user as UserType;
        let workspace = await Workspace.create({
          title,
          description,
          user:user?._id
        });
        // console.log(workspace,'test')
        let result = await workspace.save();

        if (result)
          return res
            .status(200)
            .json({ msg: "Successfully created workspace", result });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getAllWorkspaces(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Workspace.find({}).populate('user',"-password").populate('members',"-password").exec()
      if (result)
        return res
          .status(200)
          .json({ message: "Worskapaces retrieved successfully", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async UpdateWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const workspace = await Workspace.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!workspace)
        return res.status(404).json({ message: " workspace not found" });
      res.status(200).json({ message: "Workspace  updated successfully", workspace });
    } catch (error) {
      res.status(500).json({ message: "Error in updating workspace" });
    }
    next();
  },

  async deleteWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const workspace = await Workspace.findByIdAndRemove({ _id: id });
      if (workspace)
        return res
          .status(200)
          .json({ message: "Workspace deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getWorkspaceById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await Workspace.findById(id).populate('user',"-password").exec()
      if (!result)
        return res.status(404).json({ message: " Workspace not found" });
      res.status(200).json({ msg: "successfully retrieved Workspace ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getcurrentWorkspace(req: Request, res: Response, next: NextFunction){
//     try{
//       if (!req.user) {
//         return res.status(401).json({ message: "User not authenticated" });
//       }
  
//       const user = req.user as UserType;
//       const result  = await Workspace.findOne({user:user?._id});
//       if(!result) {
//          res.status(404).json({ message: " Current Workspace not found" });
//       }
//       res.status(200).json({ msg: "successfully retrieved current Workspace ", result });
//     }
    
//     catch(err){
// console.log( err)
//     }

},

async addmembersToworkspace(req: Request, res: Response, next: NextFunction){
  try{
    const { id } = req.params;
    const { members } = req.body;
    const result = await Workspace.findByIdAndUpdate(
      id,
      { $addToSet: { members: { $each: members } } }, 
      { new: true }
    );

    res.status(200).json({message:"Successfully updated member to workspace",result});
  } catch (err) {
    next(err);
  }

}

}

