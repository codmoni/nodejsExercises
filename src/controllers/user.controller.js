import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { stringifyWithBigInt } from "../utils/utils.js";
import { DuplicateUserEmailError } from "../utils/error.js";

export const handleUserSignUp = async (req, res) => {
  try {
    console.log("회원가입을 요청했습니다.");
    console.log("req body:", req.body);

    const user = await userSignUp(bodyToUser(req.body));

    res.status(StatusCodes.OK).success(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "회원가입 오류 발생",
      reason: error.message,
      data: error.data || null,
    });
  }
};
