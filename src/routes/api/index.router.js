
const router = require("express").Router()

router.post("/login",require("../../controllers/ValidationController").validate)
router.post("/register",require("../../controllers/ValidationController").register)

module.exports = router
