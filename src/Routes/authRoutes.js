const express = require("express")

const {register, login} = require("../Controllers/authControllers.js")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;