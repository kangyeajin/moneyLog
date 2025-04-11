const express = require("express");
const router = express.Router();
const { testMethod, testMethod2 } = require("../controllers/infoController");

router.use(express.json());

/* 화면 이동 라우터 */

// favicon.ico 호출 차단
router.get("/favicon.ico", function (req, res) {});

router.get("/", (req, res) => {
  res.render("main");
});

// 동적 페이지 렌더링 예시
router.get("/:page", async (req, res) => {
  try {

    var pageData = req.params.page;

    console.log(`${pageData} 화면으로 이동`);
    res.render(`partials/${pageData}`); //페이지 이동

    // res.json({pagename : pageData});
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


/* api 라우터 */
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
module.exports = router;
