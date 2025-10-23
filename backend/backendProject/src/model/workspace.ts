import { Schema, model, Document } from "mongoose";
import { workspaceActions } from "../types/workspace";
const { ObjectId } = Schema.Types;

export interface workspaceDocument extends Document {
  title: string;
  description: string;
  action: workspaceActions;
}

const WorkspaceSchma = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    action: {
      type: String,
    },
    members: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);
export const Workspace = model<workspaceDocument>("Workspace", WorkspaceSchma);
