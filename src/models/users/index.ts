import { mongoose } from "../..";

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
  password: {
    required: false,
    type: String,
  },
  passcode: {
    required: false,
    type: String,
  },
  confirmed: {
    required: true,
    type: Boolean,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
  ],
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

UserSchema.pre("save", function (done) {
  this.updated_at = Date.now();
  done();
});

// UserSchema.pre("save", function (next) {
//   now = new Date();
//   this.updated_at = now;
//   if (!this.created_at) {
//     this.created_at = now;
//   }
//   next();
// });

export default mongoose.model("Users", UserSchema);
