export const bodyToMission = (body) => {
    return {
        storeId: body.storeId,
        point: body.point,
        deadline: new Date(body.deadline),
        content: body.content,
    };
};

export const responseFromMission = (mission) => {
    return {
        missionId: mission.id,
        storeId: mission.storeId,
        point: mission.point,
        deadline: mission.deadline,
        content: mission.content,
    };
};
