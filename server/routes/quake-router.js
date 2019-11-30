const express = require("express");

const QuakeCtrl = require("../controllers/quake-ctrl");

const router = express.Router();

router.post("/quake", QuakeCtrl.createQuake);
router.put("/quake/:id", QuakeCtrl.updateQuake);
router.delete("/quake/:id", QuakeCtrl.deleteQuake);
router.get("/quake/:id", QuakeCtrl.getQuakeById);
router.get("/quakes", QuakeCtrl.getQuakes);

module.exports = router;
