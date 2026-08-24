const express = require("express")

const verifyToken = require("../Middlewares/authMiddleware.js") 

const router = express.Router();

router.get("/admin",verifyToken, (req,res)=>{
    res.json({message: "welcome admin"});
});

router.get("/patient",(req,res)=>{
    res.json({message: "welcome patient"});
});

router.get("/physiotherapist",(req,res)=>{
    res.json({message: "welcome physiotherapist"});
});

module.exports = router;