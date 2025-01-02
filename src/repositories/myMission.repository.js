import { prisma } from "../db.config.js";

export const addMissionToChallenge = async (challengeData) => {
  try {
    const existingChallenge = await prisma.myMission.findUnique({
      where: {
        user_id_mission_id: {
          user_id: challengeData.userId,
          mission_id: challengeData.missionId,
        },
      },
    });

    if (existingChallenge) return null;

    const newChallenge = await prisma.myMission.create({
      data: {
        user_id: challengeData.userId,
        mission_id: challengeData.missionId,
        complete: false,
      },
    });
    return newChallenge.id;
  } catch (err) {
    throw new Error(`Mission challenge failed: ${err.message}`);
  }
};

export const getOngoingMissionByUserId = async (userId, cursor, limit) => {
  try {
    const missions = await prisma.myMission.findMany({
      where: { user_id: userId, complete: false },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: { mission: true },
    });
    return missions;
  } catch (err) {
    throw new Error(`Failed to retrieve ongoing missions: ${err.message}`);
  }
};

export const completeMission = async (userId, missionId) => {
  try {
    const updatedMission = await prisma.myMission.update({
      where: {
        user_id_mission_id: {
          user_id: userId,
          mission_id: missionId,
        },
      },
      data: { complete: true },
    });
    return updatedMission;
  } catch (err) {
    throw new Error(`Failed to complete mission: ${err.message}`);
  }
};
