import { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface IssueDocument extends Document {
  title: string;
  description: string;
  priority:string
  dueDate:Date
  status:string
  createdBy:ObjectId
  assignedTo:ObjectId 
  project:ObjectId

}


const IssueSChema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate:{
        type:Date,
        required:false
    },

    createdBy: {
      type: ObjectId,
      ref: "User",
    },
    priority:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false
    },
    assignedTo: {
        type: ObjectId,
        ref: "User",
      },
      project: {
        type: ObjectId,
        ref: "Project",
      },
      
      
  },

  {
    timestamps: true,
  }
);
export const Issue = model<IssueDocument>("Issue",IssueSChema);
 