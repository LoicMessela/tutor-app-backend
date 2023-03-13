const router = require("express").Router();
const mongoose = require("mongoose");
const FavoriteTeacher = require("../models/FavoriteTeacher.model");
const User = require("../models/User.model");
const isAuthenticated = require("./../middlewares/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const favTeacher = await FavoriteTeacher.find({
      _id: req.user._id,
    }).populate("teacher");

    const allFavoriteTeacher = favTeacher.map((bookmark) => {
      bookmark.teacher.isBookmarked = true;
      return bookmark.teacher;
    });

    res.status(200).json(favTeacher);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/add", async (req, res, next) => {
  try {
    const foundTeacher = await User.findById(req.params.id);
    if (foundTeacher) {
      await FavoriteTeacher.findOneAndUpdate(
        {
          user: req.user._id,
          teacher: foundTeacher._id,
        },
        {},
        { upsert: true }
      );
    }

    res.json(foundTeacher);
  } catch (error) {
    next(error);
  }
});
router.post("/:id/remove", isAuthenticated, async (req, res, next) => {
  try {
    removedTEacher = await FavoriteCourse.findOneAndDelete({
      user: req.user._id,
      course: req.params._id,
    });

    res.json(removedTeacher);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
