
const express = require("express")
const router = express.Router();
const adminControllers = require("../controllers/admin-controller");
const prisma = require("../configs/prisma");

// Path ShowData
router.get("/subject", adminControllers.getSubject);
router.get("/users", adminControllers.getUsers);
router.get("/teachers", adminControllers.getTeacher);
router.get("/major", adminControllers.getMajor);
router.get("/sections", adminControllers.getSections);
router.get("/builds", adminControllers.getBuilds);
router.get("/rooms", adminControllers.getRoom);

// Path Create
router.post("/subject", adminControllers.createSubject);
router.post("/users", adminControllers.createUser);
router.post("/teachers", adminControllers.createTeacher);
router.post("/major", adminControllers.createMajor);
router.post("/sections", adminControllers.createSections);
router.post("/builds", adminControllers.createBuilds);
router.post("/rooms", adminControllers.createRoom);

// Path Edit
router.put("/users/:userId", adminControllers.editUserById);

// Path Delete
// router.delete("/subject/:subjectId", adminControllers)
// router.delete("/users/:userId", adminControllers)
// router.delete("/teachers/:teacherId", adminControllers)
// router.delete("/major/:majorId", adminControllers)
// router.delete("/sections/:sectionId", adminControllers)
// router.delete("/builds/:buildId", adminControllers)
// router.delete("/builds/:buildId", adminControllers)

module.exports = router;