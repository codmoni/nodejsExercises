import {
  addMissionToChallenge,
  completeMission,
  getOngoingMissionByUserId,
} from "../repositories/myMission.repository.js";
import { responseFromMyMission } from "../dtos/myMission.dto.js";

export const challengeMissionService = async (challengeData) => {
  const challengeId = await addMissionToChallenge(challengeData);
  if (challengeId == null) throw new Error("Mission already challenged.");
  return responseFromMyMission({
    id: challengeId,
    ...challengeData,
    complete: false,
  });
};

export const listOngoingMissions = async (userId, cursor, limit = 10) => {
  const missions = await getOngoingMissionByUserId(userId, cursor, limit);
  return missions.map(responseFromMyMission);
};

export const completeOngoingMission = async (userId, missionId) => {
  const mission = await completeMission(userId, missionId);
  return responseFromMyMission(mission);
};
