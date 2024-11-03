import { addMissionToChallenge } from "../repositories/myMission.repository.js";
import { responseFromMyMission } from "../dtos/myMission.dto.js";

export const challengeMissionService = async (challengeData) => {
    const challengeId = await addMissionToChallenge(challengeData);
    if (challengeId == null) {
        throw new Error("Mission already challenged.");
    }
    return responseFromMyMission({ id: challengeId, ...challengeData, complete: false });
};
