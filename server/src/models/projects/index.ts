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
  // contributor: [
  // {
  //   email: {
  //     required: false,
  //     type: String,
  //   },
  //   name: {
  //     required: false,
  //     type: String,
  //   },
  // },
  // ],
});

export default mongoose.model("Projects", ProjectSchema);
