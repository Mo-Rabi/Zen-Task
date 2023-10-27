import { Schema, model, Types } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    authorId: {
      type: Types.ObjectId,
      ref: "User",
    },
    assignTo: {
      type: String,
      ref: "User",
    },
    deadline: {
      type: Date,
    },
    isOverdue: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = model("Task", taskSchema);

export default taskModel;
