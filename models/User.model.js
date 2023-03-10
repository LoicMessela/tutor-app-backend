const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    bio: {
      type: String,
      maxLength: 300,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    telephoneNumber: {
      type: Number,
      required: [true, "telephone Number required"],
    },
    city: {
      type: String,
      required: [true, "city required"],
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
const User = model("User", userSchema);
module.exports = User;
