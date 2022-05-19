// const mongoose = require('mongoose');
import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
});

const RoomSchema = new mongoose.Schema({
  id: {
    required: true,
    unique: true,
    type: String,
  },
  projectId: {
    required: true,
    type: String,
  },
  activeUsers: [userDetailSchema],
});

export default mongoose.model("Rooms", RoomSchema);
