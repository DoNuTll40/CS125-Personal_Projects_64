
const express = require("express");
const visitGPSController = require("../controllers/visitGPS-controller");
const router = express.Router();

router.get('/gps', visitGPSController.viewVisit)
router.get('/gps/view:vs_id', () => {})

module.exports = router;