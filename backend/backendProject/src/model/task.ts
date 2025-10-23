import { Ipriority } from "../types";
import { Status } from "../types/project";
import { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface taskDocument extends Document {
  name: string;
  dueDate:Date
  startDate: Date;
  endDate: Date;
  status: Status;
  description:string,
  priority:Ipriority,
  assignedTo: ObjectId|any
  Issue: ObjectId;
}

const taskSChema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
      required: false,
    },
    description:{
      type:String,
      required: false,
    },

    endDate: {
      type: Date,
      required: false,
    },
   
    status: {
      type: String,
      default: Status.NOTSTARTED
    },
    priority:{
      type:String,
      default:Ipriority.NONE
    },
    user: {
      type: ObjectId,
      ref: "User",
      require: true,
    },
    assignedTo: {
      type: ObjectId,
      ref: "User",
    },
    issue: {
      type: ObjectId,
      ref: "Issue",
    },
  },

  {
    timestamps: true,
  }
);
export const Task = model<taskDocument>("Task", taskSChema);
