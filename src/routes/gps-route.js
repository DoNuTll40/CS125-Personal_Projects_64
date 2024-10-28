
const express = require("express");
const visitGPSController = require("../controllers/visitGPS-controller");
const router = express.Router();

router.get('/gps', visitGPSController.viewVisit)
router.get('/gps/:vs_id', visitGPSController.viewVisitById)

module.exports = router;