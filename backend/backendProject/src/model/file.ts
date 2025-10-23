import { Status } from "../types/project";
import { Schema, model, Document, ObjectId, Types } from "mongoose";
const { ObjectId } = Schema.Types;

export interface FileDocument extends Document {
  name: string;
  path: string;
  file: string;
  project: Types.ObjectId ;
  uploadedBy: Types.ObjectId ;
}

const FileSChema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path:{
        type: String,

    },
    file: {
        type: String,
       
      },
    project:{
        type:ObjectId,
        ref:'Project'
    },
    uploadedBy:{
        type:ObjectId,
        ref:'User'
    }
  
   
  },

  {
    timestamps: true,
  }
);
export const File = model<FileDocument>("File", FileSChema);