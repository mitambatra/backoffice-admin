
const router = require("express").Router()

router.post("/validate",require("../../controllers/ValidationController").validate)


module.exports = router
