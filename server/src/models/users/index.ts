// const mongoose = require('mongoose');
// import mongoose from "mongoose";
import { mongoose } from "../..";
import projects from "../projects";

export const UserSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
  ],
});

// const projectSchema = new mongoose.Schema({
//   projectId: {
//     required: true,
//     sparse: true,
//     // unique: true,
//     type: String,
//   },
//   projectDetail: {
//     required: true,
//     sparse: true,
//     type: Object,
//   },
//   contributor: [
//     {
//       email: {
//         // unique: true,
//         sparse: true,
//         required: true,
//         type: String,
//       },
//       name: {
//         required: true,
//         type: String,
//       },
//     },
//   ],
// });

// const UserSchema = new mongoose.Schema({
//   userId: {
//     required: true,
//     unique: true,
//     type: String,
//   },
//   owner: userDetailSchema,
//   projects: {
//     required: false,
//     sparse: true,
//     type: [projectSchema],
//   },
// });

export default mongoose.model("Users", UserSchema);
