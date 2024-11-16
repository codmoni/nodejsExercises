import {
  addMission,
  getMissionsByStoreId,
} from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

export const addMissionService = async (missionData) => {
  try {
    const missionId = await addMission(missionData);
    return responseFromMission({ id: missionId, ...missionData });
  } catch (error) {
    throw error;
  }
};

export const listStoreMissions = async (storeId, cursor, limit = 10) => {
  try {
    const missions = await getMissionsByStoreId(storeId, cursor, limit);
    return missions.map(responseFromMission);
  } catch (error) {
    throw error;
  }
};
