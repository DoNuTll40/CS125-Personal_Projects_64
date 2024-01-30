
const express = require("express")
const router = express.Router();
const adminControllers = require("../controllers/admin-controller")

router.get("/subject", adminControllers.getSubject);
router.get("/users", adminControllers.getUsers);
router.get("/teachers", adminControllers.getTeacher);
router.get("/major", adminControllers.getMajor);
router.get("/sections", adminControllers.getSections);
router.get("/builds", adminControllers.getBuilds);
router.get("/rooms", adminControllers.getRoom);

router.post("/subject", adminControllers.createSubject);
router.post("/users", adminControllers.createUser);
router.post("/teachers", adminControllers.createTeacher);
router.post("/major", adminControllers.createMajor);
router.post("/sections", adminControllers.createSections);
router.post("/builds", adminControllers.createBuilds);
router.post("/rooms", adminControllers.createRoom);

module.exports = router;