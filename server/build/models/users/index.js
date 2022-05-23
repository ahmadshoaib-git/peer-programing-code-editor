"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const __1 = require("../..");
exports.UserSchema = new __1.mongoose.Schema({
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
            type: __1.mongoose.Schema.Types.ObjectId,
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
exports.UserSchema.pre("save", function (done) {
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
exports.default = __1.mongoose.model("Users", exports.UserSchema);
