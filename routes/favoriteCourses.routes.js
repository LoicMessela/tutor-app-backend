const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Course = require("../models/Course.model");
const FavoriteCourse = require("../models/FavoriteCourse.model");
const FavoriteTeacher = require("../models/FavoriteTeacher.model");
const User = require("../models/User.model");

// GET Favorite Courses

router.get("/", async (req, res, next) => {
  try {
    const favoriteCourses = await FavoriteCourse.find({
      user: req.user._id,
    }).populate("course");

    const allFavoriteCourses = favoriteCourses.map((bookmark) => {
      bookmark.course.isBookmarked = true;
      return { course: bookmark.course, id: bookmark._id };
    });

    res.json(allFavoriteCourses);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/add", async (req, res, next) => {
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

router.delete("/:id/remove", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const removedCourse = await FavoriteCourse.findOneAndDelete({
      course: id,
      user: req.user._id,
    });

    res.json(removedCourse);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
