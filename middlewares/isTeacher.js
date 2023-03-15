async function isTeacher(req, res, next) {
    try {
        if (req.user.isTeacher) {
            next()
        } else {
            res.status(403).json({ message: "You're not a teacher" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = isTeacher;