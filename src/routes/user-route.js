
const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.get("/table", userController.table);
router.get("/table/:id", userController.getTableById);
router.get("/user/:userId", userController.getUserBID)
router.get("/class", userController.getClass)

module.exports = router;
