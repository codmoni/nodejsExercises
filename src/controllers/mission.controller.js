import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import {
  addMissionService,
  listStoreMissions,
} from "../services/mission.service.js";

export const handleAddMission = async (req, res) => {
  try {
    console.log("미션 추가를 요청했습니다.");
    console.log("req.body: ", req.body);

    const mission = await addMissionService(bodyToMission(req.body));

    res.status(StatusCodes.CREATED).success(mission);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "미션 추가 오류 발생",
      reason: error.message,
      data: error.data || null,
    });
  }
};

export const handleListStoreMissions = async (req, res) => {
  try {
    console.log("가게 미션 조회를 요청했습니다.");
    console.log("req body: ", req.body);

    const { storeId } = req.params;
    const { cursor, limit } = req.query;
    const missions = await listStoreMissions(
      storeId,
      cursor,
      parseInt(limit, 10)
    );

    res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "가게 미션 조회 오류 발생",
      reason: error.message,
      data: error.data || null,
    });
  }
};
