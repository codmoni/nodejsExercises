import dotenv from "dotenv";
import app from "./app.js";

// index.js에는 서버 실행 로직만 포함하도록 코드 수정

// 환경변수 로드
dotenv.config();

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
