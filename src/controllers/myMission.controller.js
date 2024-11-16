import { StatusCodes } from "http-status-codes";
import { bodyToMyMission } from "../dtos/myMission.dto.js";
import { challengeMissionService } from "../services/myMission.service.js";

export const handleChallengeMission = async (req, res, next) => {
  try {
    console.log("도전 미션 생성을 요청했습니다.");
    console.log("req body: ", req.body);

    const myMission = await challengeMissionService(bodyToMyMission(req.body));

    res.status(StatusCodes.CREATED).success(myMission);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).error({
      errorCode: "도전 미션 생성 오류 발생",
      reason: error.message,
      data: error.data || null,
    });
  }
};
