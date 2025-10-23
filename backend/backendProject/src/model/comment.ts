import { Schema, model, Document, ObjectId } from "mongoose";
import { CommentType } from "../types/comment";
const { ObjectId } = Schema.Types;

export interface CommentDocument extends Document {
  comment: string;
  type: CommentType;  
  commentedBy: any;
}
const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(CommentType), 
      required: true,
    },
    commentedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model<CommentDocument>("Comment", commentSchema);

export interface TaskCommentDocument extends CommentDocument {
  task: ObjectId;
}

const TaskCommentSchema = new Schema(
  {
    task: {
      type: ObjectId,
      ref: "Task",
    },
  }
);

 const TaskComment = Comment.discriminator<TaskCommentDocument>("TaskComment", TaskCommentSchema);

export interface ProjectCommentDocument extends CommentDocument {
  project: ObjectId;
}

const ProjectCommentSchema = new Schema(
  {
    project: {
      type: ObjectId,
      ref: "Project",
    },
  }
);

 const ProjectComment = Comment.discriminator<ProjectCommentDocument>("ProjectComment", ProjectCommentSchema);

export interface IssueCommentDocument extends CommentDocument {
  issue: ObjectId;
}

const IssueCommentSchema = new Schema(
  {
    issue: {
      type: ObjectId,
      ref: "Issue",
    },
  }
);

 const IssueComment = Comment.discriminator<IssueCommentDocument>("IssueComment", IssueCommentSchema);

export {
  Comment,
  TaskComment,
  ProjectComment,
  IssueComment,
};