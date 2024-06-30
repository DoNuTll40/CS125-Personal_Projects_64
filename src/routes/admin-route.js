
const express = require("express")
const router = express.Router();
const adminControllers = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");

// Path ShowData
router.get("/subject", adminControllers.getSubject);
router.get("/subject/:subId", adminControllers.getSubjectById);
router.get("/users", adminControllers.getUsers);
router.get("/all/users*", adminControllers.allGetUsers)
router.get("/users/:userId", adminControllers.getUsersById);
router.get("/major", adminControllers.getMajor);
router.get("/sections", adminControllers.getSections);
router.get("/builds", adminControllers.getBuilds);
router.get("/builds/:id", adminControllers.getBuildById);
router.get("/rooms", adminControllers.getRoom);
router.get("/rooms/:id", adminControllers.getRoomById);
router.get("/class", adminControllers.getClass);
router.get("/class/:id", adminControllers.getClassByID);
router.get("/schedule/:id", adminControllers.getSchedule);
router.get("/teacher/schedule", adminControllers.teacherSchedule);
router.get("/banner", adminControllers.getBanner);
router.get("/banner/:bannerID", adminControllers.getBannerByID);

// Path Create
router.post("/subject", adminControllers.createSubject);
router.post("/users", upload.array("image", 1), adminControllers.createUser);
router.post("/major", adminControllers.createMajor);
router.post("/sections", adminControllers.createSections);
router.post("/builds", upload.array("imageBuild", 1), adminControllers.createBuild);
router.post("/rooms", adminControllers.createRoom);
router.post("/schedule", adminControllers.createSchedule);
router.post("/class", adminControllers.createClass);
router.post("/banner", upload.array("image", 1), adminControllers.createBanner);

// Path Edit
router.patch("/users/:userId", adminControllers.editUserById);
router.patch("/users/passwd/:userId", adminControllers.changPassword);
router.patch('/profile', upload.array("profileImage", 1), adminControllers.updateProfile)
router.patch('/profile/:userId', upload.array("profileImage", 1), adminControllers.updateProfileById)
router.patch('/major/:majorId', adminControllers.updateMajors)
router.patch('/subject/:subjectId', adminControllers.updateSubject)
router.patch("/schedule/:id", adminControllers.updateSchedule);
router.patch('/rooms/:roomId', adminControllers.updateRoom)
router.patch('/class/:id', adminControllers.updateClass)
router.patch('/builds/:buildId', upload.array("imageBuild", 1), adminControllers.updateBuild);
router.patch("/banner/:bannerId", upload.array("imageBanner", 1), adminControllers.updateBanner);
router.patch("/banner/status/:bannerId", adminControllers.updateStatusBanner);

// Path Delete
router.delete("/subject/:subjectId", adminControllers.deleteSubjects)
router.delete("/users/:userId", adminControllers.deleteUsers);
router.delete("/schedule/:id", adminControllers.deleteSchedule);
router.delete("/rooms/:roomId", adminControllers.deleteRoom);
router.delete("/builds/:buildId", adminControllers.deleteBuild)
router.delete("/class/:classId", adminControllers.deleteClassById)
router.delete("/major/:majorId", adminControllers.deleteMajor)
router.delete("/banner/:bannerId", adminControllers.deleteBanner)

module.exports = router;