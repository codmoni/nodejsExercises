import {
  addMission,
  getMissionsByStoreId,
} from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

export const addMissionService = async (missionData) => {
  const missionId = await addMission(missionData);
  return responseFromMission({ id: missionId, ...missionData });
};

export const listStoreMissions = async (storeId, cursor, limit = 10) => {
  const missions = await getMissionsByStoreId(storeId, cursor, limit);
  return missions.map(responseFromMission);
};
