import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addMissionService } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
    try {
        const missionData = bodyToMission(req.body);
        const mission = await addMissionService(missionData);
        res.status(StatusCodes.CREATED).json(mission);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
