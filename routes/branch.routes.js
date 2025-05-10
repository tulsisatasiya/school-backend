const express = require("express");
const { branchController } = require("../controllers");
// const verifyAdmin = require("../middlewares/verifyAdmin");
const validate = require("../middlewares/validate");
const { branchValidationSchema } = require("../validation/branch.validation");
const verifyMainAdmin = require("../middlewares/verifyMainAdmin");

const router = express.Router();

/* Admin & User: Get All Branches */
router.get("/get", branchController.getAllBranches);

/* Admin & User: Get Branch by ID or Name */
// router.get("/get/:search", branchController.getBranchByIdOrName);

/* Admin Only: Add Branch */
router.post("/add", verifyMainAdmin,validate(branchValidationSchema), branchController.addBranch);

/* Admin Only: Update Branch */
router.put("/update/:id",  validate(branchValidationSchema), branchController.updateBranch);

/* Admin Only: Delete Branch */
router.delete("/delete/:id",  branchController.deleteBranch);



module.exports = router;
