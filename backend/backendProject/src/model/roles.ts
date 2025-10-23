import mongoose, { Model, Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  description: string;
}

export interface RoleModel extends Model<IRole> {}

const RoleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Roles = mongoose.model<IRole, RoleModel>("Roles", RoleSchema);
