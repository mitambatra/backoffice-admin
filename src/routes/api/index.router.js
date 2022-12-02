
const router = require("express").Router()

router.post("/validate",require("../../controllers/ValidationController").validate)
router.post("/get-history",require("../../controllers/ValidationController").getHistoryListe)
router.post("/new-data",require("../../controllers/DataController").newData)
router.post("/theme",require("../../controllers/DataController").getAllTheme)

router.post("/login",require("../../controllers/ValidationController").login)
router.post("/register",require("../../controllers/ValidationController").register)

module.exports = router
