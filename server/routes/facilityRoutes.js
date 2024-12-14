const express = require("express");
const router = express.Router();
const facilityController = require("../controllers/facilityController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", facilityController.getFacilities);
router.post("/add-facility", authMiddleware, roleMiddleware("admin"), facilityController.addFacility);
router.delete("delete-facility/:id",authMiddleware, roleMiddleware("admin"),facilityController.deleteFacility);
router.put("/update-facility/:id", authMiddleware, roleMiddleware("admin"), facilityController.updateFacility);






module.exports = router;