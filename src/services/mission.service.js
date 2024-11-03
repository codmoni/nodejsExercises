import { addMission } from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

export const addMissionService = async (missionData) => {
    const missionId = await addMission(missionData);
    return responseFromMission({ id: missionId, ...missionData });
};
