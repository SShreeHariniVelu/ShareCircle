const express = require("express");
const router  = express.Router();
const { getUserProfile, getAllUsers, deleteUser } = require("../controllers/authController");

router.get("/",          getAllUsers);
router.get("/:uid",      getUserProfile);
router.delete("/:uid",   deleteUser);

module.exports = router;