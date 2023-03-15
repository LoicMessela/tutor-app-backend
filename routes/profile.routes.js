const router = require("express").Router();
const User = require("./../models/User.model");

router.put("/", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.status(204).json("User Profile has been deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
