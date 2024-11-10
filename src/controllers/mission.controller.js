import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import {
  addMissionService,
  listStoreMissions,
} from "../services/mission.service.js";

export const handleAddMission = async (req, res) => {
  try {
    const missionData = bodyToMission(req.body);
    const mission = await addMissionService(missionData);
    res.status(StatusCodes.CREATED).json(mission);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const handleListStoreMissions = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { cursor, limit } = req.query;
    const missions = await listStoreMissions(
      storeId,
      cursor,
      parseInt(limit, 10)
    );
    res.status(StatusCodes.OK).json(missions);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
