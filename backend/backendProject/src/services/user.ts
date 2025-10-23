import { Request, Response, NextFunction } from "express";
import {  User } from "../model/user";

export const UserService = {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await User.find({}).populate('role').select("-password").exec();
      if (result)
        return res
          .status(200)
          .json({ message: "Users retrieved successfully", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error in updating user product" });
    }
    next();
  },

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndRemove({ _id: id });
      if (user)
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await User.findById(id) .populate('role');
    
      if (!result) return res.status(404).json({ message: " User not found" });
      res.status(200).json({ msg: "successfully retrieved user ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async AssignRole(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id; 
    const role = req.body.role;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      if (user.role.includes(role)) {
        return res.status(400).send({ message: "Role already exists for this user" });
      }
  
      user.role.push(role);
    
      const result=  await user.save();
  
      return res.status(200).send({ message: "User role updated successfully",result });
    } catch (error) {
      res.status(500).send({ message: "Server error" });
    }
    next()
  },

  async UnAssignRole(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id; 
    const role = req.body.role;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  

      if (!user.role.includes(role)) {
        return res.status(400).send({ message: "Role does not exist for this user" });
      }
  
      const index = user.role.indexOf(role);
      user.role.splice(index, 1);
  
    
      const result=  await user.save();
  
      return res.status(200).send({ message: "User role updated successfully",result });
    } catch (error) {
      res.status(500).send({ message: "Server error" });
    }
    next()
  }
  

}