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

//진행 중 미션 목록 조회
export const handleListOngoingMissions = async(req, res, next)=>{
  try{
    console.log("진행 중 미션 목록 조회를 요청했습니다.");
    const {userId} = req.query;
    const{cursor,limit} = req.qeury;

    const missions = await listOngoingMissions(userId, cursor, parseInt(limit)||10);

  } catch (error){
    res.status(StatusCodes.BAD_REQUEST).error({
      errorCode: "진행 중 미션 조회 오류 발생",
      reason:error.message,
      data:error.data||null
    })
  }
}

//미션 완료
export const handleCompleteMission = async(req, res, next)=>{
  try{
    console.log("미션 완료를 요청했습니다.");
    const {userId, missionId} = req.body;

    const completeMission = await completeOngoingMission(userId, missionId);
  }catch(error){
    res.status(StatusCodes.BAD_REQUEST).error({
      errorCode:"미션 완료 처리 오류 발생",
      reason:error.message,
      data:error.data||null,
    })
  }
}