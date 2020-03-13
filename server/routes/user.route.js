const router = require("express").Router();

router.get("/ping", (req, res) => {
  console.log("Pong");
  res.send("Pong");
});

router.post("/login", (req, res) => {
  const { mobile, password } = req.body;

  console.log(req.body);

  if (mobile === "9384288287") {
    if (password === "hi123456") {
      res.json({
        status: true
      });
    } else {
      res.json({
        status: false,
        reason: "password"
      });
    }
  } else {
    res.json({
      status: false,
      reason: "mobile"
    });
  }
});

module.exports = router;
