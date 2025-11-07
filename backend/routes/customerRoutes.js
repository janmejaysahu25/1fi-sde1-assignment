// routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const { signup, signin,logout } = require("../controllers/customerController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);



module.exports = router;
