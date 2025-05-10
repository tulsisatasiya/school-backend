const express = require("express");
const router = express.Router();

const {classController} = require("../controllers");
const verifyAdmin = require("../middlewares/verifyAdmin");

// Routes
router.post("/add", verifyAdmin, classController.createClassController);
router.get("/", classController.getAllClassesController);
router.get("/:id", classController.getClassByIdController);
router.put("/:id", verifyAdmin, classController.updateClassController);
router.delete("/:id", verifyAdmin, classController.deleteClassController);

module.exports = router;
