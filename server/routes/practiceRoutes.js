// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const authorizeRole = require("../middleware/roleMiddleware");

// router.get("/practice/admin", authMiddleware,authorizeRole('admin'),(req,res)=>{
//     res.json({message:"You are an admin"})
// })
// router.get("/practice/user", authMiddleware,authorizeRole('user'),(req,res)=>{
//     res.json({message:"You are a user"})
// })


// module.exports = router;