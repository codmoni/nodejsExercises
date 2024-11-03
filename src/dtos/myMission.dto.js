export const bodyToMyMission = (body) => {
    return {
        userId: body.userId,
        missionId: body.missionId,
    };
};

export const responseFromMyMission = (myMission) => {
    return {
        myMissionId: myMission.id,
        userId: myMission.userId,
        missionId: myMission.missionId,
        complete: myMission.complete,
    };
};
