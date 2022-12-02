
const router = require("express").Router()

router.post("/validate",require("../../controllers/ValidationController").validate)
router.post("/get-history",require("../../controllers/ValidationController").getHistoryListe)
router.post("/new-data",require("../../controllers/DataController").newData)
router.post("/theme",require("../../controllers/DataController").getAllTheme)


module.exports = router
