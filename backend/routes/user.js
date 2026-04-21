const express = require("express");
const router = express.Router();
const { userSignup, userLogin, getUser } = require("../controller/user");
const auth = require("../middleware/auth");

router.post("/signup", userSignup); // register
router.post("/login", userLogin); // login
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  return res.status(200).json({ message: "Logged out" });
});
router.get("/user", auth, getUser);

module.exports = router;
