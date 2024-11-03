import { StatusCodes } from "http-status-codes";
import { bodyToMyMission } from "../dtos/myMission.dto.js";
import { challengeMissionService } from "../services/myMission.service.js";

export const handleChallengeMission = async (req, res, next) => {
    try {
        const challengeData = bodyToMyMission(req.body);
        const myMission = await challengeMissionService(challengeData);
        res.status(StatusCodes.CREATED).json(myMission);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};
