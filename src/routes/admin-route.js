
const express = require("express")
const router = express.Router();
const adminControllers = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");

// Path ShowData
router.get("/subject", adminControllers.getSubject);
router.get("/users", adminControllers.getUsers);
router.get("/users/:userId", adminControllers.getUsersById);
router.get("/major", adminControllers.getMajor);
router.get("/sections", adminControllers.getSections);
router.get("/builds", adminControllers.getBuilds);
router.get("/rooms", adminControllers.getRoom);
router.get("/class", adminControllers.getClass);
router.get("/class/:id", adminControllers.getClassByID);
router.get("/schedule/:id", adminControllers.getSchedule);

// Path Create
router.post("/subject", adminControllers.createSubject);
router.post("/users", upload.array("image", 1), adminControllers.createUser);
router.post("/major", adminControllers.createMajor);
router.post("/sections", adminControllers.createSections);
router.post("/builds", upload.array("imageBuild", 1),adminControllers.createBuild);
router.post("/rooms", adminControllers.createRoom);
router.post("/schedule", adminControllers.createSchedule);

// Path Edit
router.patch("/users/:userId", adminControllers.editUserById);
router.patch('/profile', upload.array("profileImage", 1), adminControllers.updateProfile)

// Path Delete
router.delete("/subject/:subjectId", adminControllers.deleteSubjects)
router.delete("/users/:userId", adminControllers.deleteUsers);
router.delete("/schedule/:id", adminControllers.deleteSchedule);
router.delete("/rooms/:roomId", adminControllers.deleteRoom);
router.delete("/builds/:buildId", adminControllers.deleteBuild)
// router.delete("/teachers/:teacherId", adminControllers)
// router.delete("/major/:majorId", adminControllers)
// router.delete("/sections/:sectionId", adminControllers)




module.exports = router;