const router = require("express").Router();
const Course = require("./../models/Course.model");
const User = require("./../models/User.model");

router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Profile has been deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
