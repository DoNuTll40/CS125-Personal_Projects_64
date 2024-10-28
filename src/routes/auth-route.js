
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const admin = require("../middlewares/admin");
const authenticate = require("../middlewares/authenticate");
const visitGPSController = require("../controllers/visitGPS-controller");

router.post("/register", authenticate, admin, authController.register);
router.post("/login", authController.login);
router.post("/gps", visitGPSController.saveVisitData);
router.post("/adminLogin", authController.adminLogin);
router.get("/me", authenticate, authController.getMe);

module.exports = router;