import { prisma } from "../db.config.js";

export const addMission = async (missionData) => {
  try {
    const mission = await prisma.mission.create({
      data: {
        store_id: missionData.storeId,
        point: missionData.point,
        deadline: missionData.deadline,
        content: missionData.content,
      },
    });
    return mission.id;
  } catch (err) {
    throw new Error(`Mission creation failed: ${err.message}`);
  }
};

export const getMissionsByStoreId = async (storeId, cursor, limit) => {
  try {
    const missions = await prisma.mission.findMany({
      where: { store_id: storeId },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { deadline: "asc" },
    });
    return missions;
  } catch (err) {
    throw new Error(`Failed to retrieve missions: ${err.message}`);
  }
};
