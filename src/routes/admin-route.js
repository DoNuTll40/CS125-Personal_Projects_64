
const express = require("express")
const router = express.Router();
const adminControllers = require("../controllers/admin-controller")

router.get("/:sub", adminControllers.getSubject);

router.post("/resigter", adminControllers.createSubject)

// router.get("/:id", (req, res, next) => {
//     const { id } = req.params;
//     res.json({ id, message : "test params" })
// });

module.exports = router;