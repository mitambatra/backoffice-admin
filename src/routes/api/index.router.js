
const router = require("express").Router()

router.post("/validate",require("../../controllers/ValidationController").validate)
router.post("/get-history",require("../../controllers/ValidationController").getHistoryListe)
router.post("/new-data",require("../../controllers/DataController").newData)
router.post("/theme",require("../../controllers/DataController").getAllTheme)
router.post("/type",require("../../controllers/DataController").getAllType)
router.post("/intitule",require("../../controllers/DataController").getIntitule)
router.post("/chapitre",require("../../controllers/DataController").getChapitre)
router.post("/article",require("../../controllers/DataController").getArticle)

router.post("/login",require("../../controllers/ValidationController").login)
router.post("/register",require("../../controllers/ValidationController").register)

router.post("/paragraphe_delete",require("../../controllers/DataController").deleteParagraphe)
router.post("/article_delete",require("../../controllers/DataController").deleteArticle)
router.post("/chapitre_delete",require("../../controllers/DataController").deleteChapitre)
router.post("/intitule_delete",require("../../controllers/DataController").deleteIntitule)



module.exports = router
