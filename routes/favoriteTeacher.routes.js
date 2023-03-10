const router = require('express').Router()
const mongoose = require("mongoose");
const FavoriteTeacher = require("./../models/FavoriteTeacher.model")
const User = require('./../models/User.model')
const isAuthenticated = require('./../middlewares/isAuthenticated')



router.get('/teachers', isAuthenticated, async (req, res, next) => {
    try {
        const favTeacher = await FavoriteTeacher.find({ _id: req.user._id }).populate("teacher")
        res.status(200).json(favTeacher);
    } catch (error) {
        next(error)
    }
})

router.post('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const bookTeachers = await FavoriteTeacher.findById(id);

    } catch (error) {
        next(error)
    }
})

router.delete("/:id")


module.exports = router;