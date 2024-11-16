import cors from "cors";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddStore } from "./controllers/store.controller.js";
import { handleAddReview } from "./controllers/review.controller.js";
import { handleAddMission } from "./controllers/mission.controller.js";
import { handleChallengeMission } from "./controllers/myMission.controller.js";

// app.js는 Express 미들웨어를 사용하고 라우트 설정을 담당하는 데에 집중
// Express 앱의 확장성을 고려할 때 index.js와 분리하는 게 더 좋은 것 같음

const app = express();

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users/signup", handleUserSignUp);
app.post("/stores", handleAddStore);
app.post("/reviews", handleAddReview);
app.post("/missions", handleAddMission);
app.post("/my-missions", handleChallengeMission);

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
