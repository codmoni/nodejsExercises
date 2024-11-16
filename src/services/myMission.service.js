import {
  addMissionToChallenge,
  completeMission,
  getOngoingMissionByUserId,
} from "../repositories/myMission.repository.js";
import { responseFromMyMission } from "../dtos/myMission.dto.js";
import { MissionAlreadyChallengedError } from "../utils/error.js";

//도전 미션으로 전환
export const challengeMissionService = async (challengeData) => {
  try {
    const challengeId = await addMissionToChallenge(challengeData);
    if (challengeId == null) {
      throw new MissionAlreadyChallengedError("이미 도전 중인 미션입니다.", {
        missionId: challengeData.missionId,
      });
    }
    return responseFromMyMission({
      id: challengeId,
      ...challengeData,
      complete: false,
    });
  } catch (error) {
    throw error;
  }
};

//진행 중 미션 목록 조회
export const listOngoingMissions = async (userId, cursor, limit = 10) => {
  try {
    const missions = await getOngoingMissionByUserId(userId, cursor, limit);
    return missions.map(responseFromMyMission);
  } catch (error) {
    throw error;
  }
};

// 미션 완료 처리
export const completeOngoingMission = async (userId, missionId) => {
  try {
    const mission = await completeMission(userId, missionId);
    return responseFromMyMission(mission);
  } catch (error) {
    throw error;
  }
};
