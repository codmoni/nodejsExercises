import cors from "cors";
import path from "path";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddStore } from "./controllers/store.controller.js";
import { handleAddReview } from "./controllers/review.controller.js";
import { handleAddMission, handleListStoreMissions } from "./controllers/mission.controller.js";
import { handleChallengeMission,handleListOngoingMissions, handleCompleteMission, } from "./controllers/myMission.controller.js";
import swaggerUiExpress from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";
import userRouter from "./routes/user.router.js";
import storeRouter from "./routes/store.router.js";
import reviewRouter from "./routes/review.router.js";
import missionRouter from "./routes/mission.router.js";
import myMissionRouter from "./routes/myMission.router.js";


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

// Swagger(openapi) 관련 설정
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: "/openapi.json",
      },
    }
  )
);

app.get("/openapi.json", async (req, res, next) => {
  const options = {
    openapi: "3.0.0",
    disableLogs: false,
    writeOutputFile: true,
  };
  const outputFile = path.resolve("./swagger-output.json");
  const routes = [
    path.resolve("./src/app.js"),
    path.resolve("./src/routes/user.routers.js"),
  ];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000", // 서버 URL
      },
    ],
    // host: "localhost:3000",
  };
  try {
    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result.data);
  } catch (error) {
    console.error("[swagger-autogen]: Error generating OpenAPI JSON", error);
    res.status(500).json({ error: "Failed to generate OpenAPI JSON" });
  }
});


// Routers
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/stores", storeRouter);
app.use("/reviews", reviewRouter);
app.use("/missions", missionRouter);
app.use("/my-missions", myMissionRouter);


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
