const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Course = require("../models/Course.model");
const FavoriteCourse = require("../models/FavoriteCourse.model");
const FavoriteTeacher = require("../models/FavoriteTeacher.model");
const User = require("../models/User.model");

// GET Courses

router.get("/", isAuthenticated, async (req, res, next) => {
  const query = {
    title: RegExp(req.query.title, "gi"),
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
        course.isBookmarked = true;
      }
      return course;
    });

    res.json(allCourses);

  } catch (error) {
    next(error);
  }
});

// GET One Course

router.get("/:id", async (req, res, next) => {
  try {
    const oneCourse = await Course.findById(req.params.id);

    res.json({ oneCourse, message: "you got One course !" });

  } catch (error) {
    next(error);
  }
});

// Create a Course

router.post("/", async (req, res, next) => {
  try {
    const { title, description, subject, teacher } = req.body;
    const createdCourse = await Course.create({ title, description, subject, teacher });

    res.status(201).json(createdCourse);

  } catch (error) {
    next(error);
  }
});

// Update a Course

router.patch("/:id", async (req, res, next) => {
  try {

    const { id } = req.params;
    const { title, description, subject, teacher } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      {
        id,
        teacher: req.user._id,
      },
      { title, description, subject, teacher },
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

