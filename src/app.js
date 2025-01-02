import cors from "cors";
import path from "path";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddStore } from "./controllers/store.controller.js";
import { handleAddReview } from "./controllers/review.controller.js";
import {
  handleAddMission,
  handleListStoreMissions,
} from "./controllers/mission.controller.js";
import {
  handleChallengeMission,
  handleListOngoingMissions,
  handleCompleteMission,
} from "./controllers/myMission.controller.js";
import { addReviewService } from "./services/review.service.js";

import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { naverStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 공통 응답을 사용할 수 있는 헬퍼 함수
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };
  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };
  next();
});

// about 소셜 로그인
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.session());
app.use(passport.initialize());

passport.use(googleStrategy);
passport.use(naverStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


// Routers
app.get("/", (req, res) => {
  console.log("로그인 유저:", req.user);
  res.send(req.user ? `Welcome, ${req.user.name}!` : "Not logged in.");
});

app.post("/users/signup", handleUserSignUp); //회원가입
app.post("/stores", handleAddStore); //가게 생성
// app.post("/missions", handleAddMission);
// app.get("/missions", handleListStoreMissions);
// app.get("/my-missions")
app.post("/review", handleAddReview)

app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get("/oauth2/login/naver", passport.authenticate("naver"));
app.get(
  "/oauth2/callback/naver",
  passport.authenticate("naver", {
    failureRedirect: "/login", 
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

// 전역 오류를 처리하기 위한 미들웨어
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

export default app;
