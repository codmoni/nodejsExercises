import { StatusCodes } from "http-status-codes";
import { bodyToMyMission } from "../dtos/myMission.dto.js";
import { challengeMissionService } from "../services/myMission.service.js";

export const handleChallengeMission = async (req, res, next) => {
  try {
    const challengeData = bodyToMyMission(req.body);
    const myMission = await challengeMissionService(challengeData);
    res.status(StatusCodes.CREATED).json(myMission);
  } catch (error) {
    console.error("도전 미션 추가 중 오류 발생:", error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
