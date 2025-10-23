import { Ipriority } from "../types";
import { Status } from "../types/project";
import mongoose, { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface projectDocument extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: Status;
  assignedTo: ObjectId | any;
  priority: Ipriority;
  percentageCompleted: number;
  percentagePending: number;
}

const ProjectSchma = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },

    startDate: {
      type: Date,
      required: false,
    },

    endDate: {
      type: Date,
      required: false,
    },

    status: {
      type: String,
   
    },

    user: {
      type: ObjectId,
      ref: "User",
      require: false,
    },

    assignedTo: {
      type: ObjectId,
      ref: "User",
    },

    percentageCompleted: {
      type: Number,
      default: 0,
    },

    percentagePending: {
      type: Number,
      default: 0,
    },

    priority: {
      type: String,
  
    },
  },
  {
    timestamps: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);


ProjectSchma.virtual("files", {
  ref: "File",              
  localField: "_id",        
  foreignField: "project",  
});

export const Project = model<projectDocument>("Project", ProjectSchma);
