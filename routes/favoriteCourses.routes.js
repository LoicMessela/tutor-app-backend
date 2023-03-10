const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Course = require("../models/Course.model");
const FavoriteCourse = require("../models/FavoriteCourse.model");
const FavoriteTeacher = require("../models/FavoriteTeacher.model");
const User = require("../models/User.model");

// GET Favorite Courses

router.get("/favoriteCourses", async (req, res, next) => {
  try {
    const favoriteCourses = await FavoriteCourse.find({
      user: req.user._id,
    }).populate("course");

    const allFavoriteCourses = favoriteCourses.map((bookmark) => {
      bookmark.course.isBookmarked = true;
      return bookmark.course;
    });

    res.json(allFavoriteCourses);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/favoriteCourses/add", async (req, res, next) => {
  try {
    const foundCourse = await Course.findById(req.params.id);
    if (foundCourse) {
      await FavoriteCourse.findOneAndUpdate(
        {
          user: req.user._id,
          course: foundCourse._id,
        },
        {},
        { upsert: true }
      );
    }

    res.json(foundCourse);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/favoriteCourses/remove", isAuthenticated, async (req, res, next) => {
  try {
    removedCourse = await FavoriteCourse.findOneAndDelete({
      user: req.user._id,
      course: req.params._id,
    });

    res.json(removedCourse);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
