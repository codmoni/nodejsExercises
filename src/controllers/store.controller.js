import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStoreService } from "../services/store.service.js";

export const handleAddStore = async (req, res) => {
  try {
    console.log("가게 생성을 요청했습니다.");
    console.log("req body: ", req.body);

    const store = await addStoreService(bodyToStore(req.body));

    res.status(StatusCodes.CREATED).success(store);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "가게 생성 오류 발생",
      reason: error.message,
      data: error.data || null,
    });
  }
};
