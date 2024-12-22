const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile",authMiddleware, userController.getUserProfile);
router.put("/profile/update-name", authMiddleware, userController.updateName);
router.put("/profile/update-email", authMiddleware, userController.updateEmail);
router.put("/profile/update-password", authMiddleware, userController.updatePassword);
router.delete("/profile/delete-account", authMiddleware, userController.deleteUser);
router.get("/users-list", authMiddleware,roleMiddleware("admin"), userController.getAllUsers);




module.exports = router;