import { Request, Response, NextFunction } from "express";
import { User as UserType } from "../types/user";

import { Feedback } from "../model/feedback";
export const FeedBackService = {
  async CreateFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      let { title,description } = req.body;
      const user = req.user as UserType;
      let feedback = await Feedback.create({
        title,    
        description,
        raisedBy: user?._id,
      });
      let result = await feedback.save();

      if (result)
        return res
          .status(200)
          .json({ msg: "Successfully sent feedback", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  async getAllFeedBacks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    
  
        const result = await Feedback.find().populate("raisedBy","-password");

        if (result)
          return res.status(200).json({
            message: `Feedbacks retrieved successfully`,
            result,
          });
      
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getFeedBackById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await Feedback.findById(id).populate("raisedBy","-password");
      if (!result)
        return res.status(404).json({ message: " Feedback not found" });
      res.status(200).json({ msg: "successfully retrieved feedback ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      let feedback = await Feedback.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!feedback)
        return res.status(404).json({ message: "feedback not found" });
      res
        .status(200)
        .json({ message: "Feedback updated successfully", feedback });
    } catch (error) {
      res.status(500).json({ message: "Error in updating Comment" });
    }
    next();
  },

  async deleteFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
       const result= await Feedback.findByIdAndRemove(id);
       if(result){
        return res.status(200).json({msg:"Feedback deleted"})
       }
  
    
      
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
};
