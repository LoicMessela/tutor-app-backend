const router = require("express").Router();

//Home
router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use("/auth", require("./auth.routes"));
router.use("/courses", require("./courses.routes"));
router.use("/favoriteCourses", require("./favoriteCourses.routes"));
router.use("/favoriteTeachers", require("./favoriteTeachers.routes"));
router.use("/teachers", require("./teachers.routes"));
router.use("/profile", require("./profile.routes"));

module.exports = router;
