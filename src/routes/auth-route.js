
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const admin = require("../middlewares/admin");
const authenticate = require("../middlewares/authenticate");
const prisma = require("../configs/prisma");

router.post("/register", authenticate, admin, authController.register);
router.post("/login", authController.login);
router.post("/adminLogin", authController.adminLogin)
router.get("/me", authenticate, authController.getMe)
router.get("/test", async (req, res, next) => {
    const test = await prisma.major.findMany();
    res.json({ test })
})

module.exports = router;