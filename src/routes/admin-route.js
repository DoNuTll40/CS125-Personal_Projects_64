
const express = require("express")
const router = express.Router();
const adminControllers = require("../controllers/admin-controller")

router.get("/subject", adminControllers.getSubject);
router.post("/subject", adminControllers.createSubject)


module.exports = router;