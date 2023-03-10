const isAuthenticated = require("../middlewares/isAuthenticated");

const router = require("express").Router();

//Home
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use('/auth', require('./auth.routes'))
router.use('/courses', require('./courses.routes'));

router.use('/teachers', require('./teachers.routes'))
router.use('/profile', require('./profile.routes'))
router.use("/favoriteTeacher", require('./favoriteTeachers.routes'))
router.use("/favoriteCourses", require('./favoriteCourses.routes'))

module.exports = router;
