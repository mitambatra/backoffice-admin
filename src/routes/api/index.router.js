
const router = require("express").Router()

router.post("/validate",require("../../controllers/ValidationController").validate)
router.post("/get-history",require("../../controllers/ValidationController").getHistoryListe)


module.exports = router
