import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./src/controllers/user.controller.js";
import { handleAddStore } from "./src/controllers/store.controller.js";
import { handleAddReview } from "./src/controllers/review.controller.js";
import { handleAddMission } from "./src/controllers/mission.controller.js";
import { handleChallengeMission } from "./src/controllers/myMission.controller.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users/signup", handleUserSignUp);
app.post("/stores", handleAddStore);
app.post("/reviews", handleAddReview);
app.post("/missions", handleAddMission);
app.post("/my-missions", handleChallengeMission);

export default app;
