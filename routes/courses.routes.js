const router = require("express").Router();
const isTeacher = require("../middlewares/isTeacher");
const Course = require("../models/Course.model");
const FavoriteCourse = require("../models/FavoriteCourse.model");
const FavoriteTeacher = require("../models/FavoriteTeacher.model");
const User = require("../models/User.model");

// GET Courses

router.get("/", async (req, res, next) => {
  const query = {
    title: RegExp(req.query.course, "gi"),
    subject: req.query.subject,
  };
  if (!query.title) {
    delete query.title;
  }
  if (!query.subject) {
    delete query.subject;
  }

  try {
    const allCourses = await Course.find(query);

    const studentFavoriteCourses = await FavoriteCourse.find({
      user: req.user._id,
    });
    const favoriteCoursesIds = studentFavoriteCourses.map((favoriteCourse) =>
      favoriteCourse.course.toString()
    );

    allCourses.forEach((course) => {
      if (favoriteCoursesIds.includes(course.id)) {
        course._doc.isBookmarked = true;
      }
      return course;
    });

    console.log(allCourses);
    res.json(allCourses);
  } catch (error) {
    next(error);
  }
});

// GET One Course

router.get("/:id", async (req, res, next) => {
  try {
    const oneCourse = await Course.findById(req.params.id);

    res.status(200).json(oneCourse);
  } catch (error) {
    next(error);
  }
});

// Create a Course

router.use(isTeacher);
router.post("/add", async (req, res, next) => {
  try {
    const { title, description, subject } = req.body;
    const createdCourse = await Course.create({
      title,
      description,
      subject,
      teacher: req.user._id,
    });

    res.status(201).json(createdCourse);
  } catch (error) {
    next(error);
  }
});

// Update a Course

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("params", req.params);
    const { title, description, subject } = req.body;

    const updatedCourse = await Course.findOneAndUpdate(
      {
        _id: id,
        teacher: req.user._id,
      },
      { title, description, subject },
      { new: true }
    );

    res.status(202).json(updatedCourse);
  } catch (error) {
    next(error);
  }
});

// Delete a Course

router.delete("/:id", async (req, res, next) => {
  try {
    await Course.findByIdAndDelete({
      _id: req.params.id,
      teacher: req.user._id,
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
