import { mongoose } from "../..";
export const ProjectSchema = new mongoose.Schema({
  projectDetail: {
    // required: true,
    // sparse: true,
    required: true,
    type: Object,
  },
  ownerId: {
    required: true,
    type: String,
  },
  ownerEmail: {
    sparse: true,
    required: true,
    type: String,
  },
  ownerName: {
    sparse: true,
    required: true,
    type: String,
  },
  contributor: {
    type: [
      {
        email: {
          sparse: true,
          required: true,
          type: String,
        },
        name: {
          sparse: true,
          required: true,
          type: String,
        },
      },
    ],
    default: void 0,
  },
  created_at: {
    type: Date,
    default: function () {
      return Date.now();
    },
  },
  updated_at: {
    type: Date,
    default: function () {
      return Date.now();
    },
  },
});

export default mongoose.model("Projects", ProjectSchema);
