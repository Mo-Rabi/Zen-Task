import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minLength: [2, "Min number of characters is 2"],
      maxLength: [50, "Max number of characters is 50"],
    },
    lastName: {
      type: String,
      minLength: [2, "Min number of characters is 2"],
      maxLength: [50, "Max number of characters is 10"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      //required: true,
    },
    // confirmPassword: {
    //   type: String,
    //   required: true,
    // },
    //phone: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: { type: Boolean, default: false },
    // tasks: {
    //   type: Array,
    // },
    // photo: {
    //   type: Array,
    // },
    picture: {
      type: String,
    },
    avatar: {
      type: Buffer,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model("User", userSchema); //?model = collection here it will go to Users (itk adds an s) if we put it users it will create userss with 2Ss.

export default userModel;
