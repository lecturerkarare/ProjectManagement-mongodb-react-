import { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface FeedBackDocument extends Document {
  title: string;
  description: string;
}

const FeedbackSChema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    raisedBy: {
      type: ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);
export const Feedback = model<FeedBackDocument>("Feedback", FeedbackSChema);
