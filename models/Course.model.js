const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      maxLength: 500,
      required: [true, "description is required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required."],
      enum: [
        "Maths",
        "Physics",
        "Computer Science",
        "Physical Education",
        "History",
        "Chemistry",
        "Biology",
      ],
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Course = model("Course", courseSchema);

module.exports = Course;
