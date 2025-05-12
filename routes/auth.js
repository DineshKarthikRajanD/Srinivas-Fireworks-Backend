require("dotenv").config();
const express = require("express");
const router = express.Router();

router.post("/admin-auth", (req, res) => {
  const { code } = req.body;
  const SECRET_CODE = process.env.ADMIN_SECRET_CODE;

  if (code === SECRET_CODE) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
