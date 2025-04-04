require("dotenv").config(); // .env 파일을 로드

const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// // Vue 정적 파일 서빙
// //const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, 'front', 'dist')));

// // Vue SPA 처리 (history 모드 지원)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'front', 'dist', 'index.html'));
// });

// 미들웨어 설정
app.use(
    helmet({
      frameguard: false,
    })
  );
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(
    session({
      secure: true, // https 환경에서만 session 정보를 주고받음
      secret: process.env.COOKIE_SECRET,
      resave: false, // 세션이 수정될 때만 다시 저장
      saveUninitialized: true, // 처음부터 세션 생성
      cookie: {
        maxAge: 1000 * 60 * 120 , //세션 만료 시간 설정 - 120분
        httpOnly: true, //자바스크립트를 통한 세션 쿠키 사용 불가
      },
      rolling: true, // 새로고침 시 만료시간 갱신
    })
  );

// 로그인 횟수 제한
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: "5분 후 다시 시도해주세요...",
});

app.use("/login", loginLimiter);

const PORT = parseInt(process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 라우터 등록 - 모든 경로는 라우터로 보내 처리
// API 라우터
const indexRouter = require("./routes/index.js");
app.use("/api", indexRouter);
