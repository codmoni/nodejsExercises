import cors from "cors";
import dotenv from "dotenv";
import express from 'express';
import {handleUserSignUp} from "./controllers/user.controller.js" 
import { handleAddStore } from "./controllers/store.controller.js";
import { handleAddReview } from "./controllers/review.controller.js";
import { handleAddMission } from "./controllers/mission.controller.js";
import { handleChallengeMission } from "./controllers/myMission.controller.js";

dotenv.config();

const app = express()
const port = process.env.port || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.send('Hello World!')
})

app.post("/users/signup",handleUserSignUp);
app.post("/stores", handleAddStore);
app.post("/reviews", handleAddReview);
app.post("/missions", handleAddMission);
app.post("/my-missions", handleChallengeMission);

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})