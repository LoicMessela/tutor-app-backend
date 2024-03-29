const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("./../models/User.model");
const Course = require("./../models/Course.model");
const isTeacher = require("../middlewares/isTeacher");

// Find all the teachers
router.get("/", async (req, res, next) => {
  const query = {
    city: RegExp(req.query.city, "gi"),
  };
  if (!query.city) {
    delete query.city;
  }
  try {
    const teacher = await User.find({ isTeacher: true, city: query.city });

    if (!teacher) {
      res.status(404).json({ message: "No teacher found!" });
    }
    res.json(teacher);
  } catch (error) {
    next(error);
  }
});

// Find a teacher in particular
router.get("/:id", async (req, res, next) => {
  try {
    const oneTeacher = await User.findOne({
      _id: req.params.id,
      isTeacher: true,
    });
    res.json(oneTeacher);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/courses", async (req, res, next) => {
  try {
    const courses = await Course.find({ teacher: req.params.id });
    res.json(courses);
  } catch (error) {
    next(error);
  }
});

// router.use(isTeacher)

// router.post("/courses", async (req, res, next) => {
//   const { title, description, subject } = req.body;
//   try {
//     const createdCourses = await Course.create({
//       title,
//       description,
//       subject,
//       teacher: req.user._id,
//     });
//     res.status(201).json(createdCourses);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:id", async (req, res, next) => {
//   if (req.user._id === teacher)
//     try {
//       await Course.findByIdAndDelete(req.params.id);
//     } catch (error) {
//       next(error);
//     }
// });

module.exports = router;
