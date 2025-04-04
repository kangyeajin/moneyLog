const express = require("express");
const router = express.Router();
const { testMethod, testMethod2 } = require("../controllers/infoController");

router.use(express.json());

// get/post/동적페이징 렌더링 기본 예시
router.get("/users", async (req, res) => {
  try {
    const data = await testMethod();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const data = await testMethod2(req);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 동적 페이지 렌더링 예시
router.get("/:page", async (req, res) => {
  try {
    var pageData = req.params.page;
    res.json({pagename : pageData});
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
