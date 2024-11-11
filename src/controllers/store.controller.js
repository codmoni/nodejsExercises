import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStoreService } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
  try {
    const storeData = bodyToStore(req.body);
    const store = await addStoreService(storeData);
    res.status(StatusCodes.CREATED).json(store);
  } catch (error) {
    console.error("새로운 가게 추가 중 오류 발생:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
