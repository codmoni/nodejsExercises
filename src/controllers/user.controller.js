import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { stringifyWithBigInt } from "../utils/utils.js";
import { DuplicateUserEmailError } from "../utils/error.js";
/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: 회원 가입 API
 *     description: 사용자가 회원 가입을 요청합니다.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "사용자의 이메일 주소"
 *               name:
 *                 type: string
 *                 description: "사용자의 이름"
 *               gender:
 *                 type: string
 *                 description: "사용자의 성별"
 *                 enum: [male, female]
 *               location:
 *                 type: string
 *                 description: "사용자의 위치 정보"
 *               mobileNumber:
 *                 type: string
 *                 description: "사용자의 휴대전화 번호"
 *               birth:
 *                 type: string
 *                 format: date
 *                 description: "사용자의 생년월일"
 *               address:
 *                 type: string
 *                 description: "사용자의 주소"
 *               password:
 *                 type: string
 *                 description: "사용자의 비밀번호"
 *               passwordConfirm:
 *                 type: string
 *                 description: "비밀번호 확인"
 *               userType:
 *                 type: string
 *                 description: "사용자 유형"
 *                 enum: [CUSTOMER, ADMIN]
 *               userState:
 *                 type: string
 *                 description: "사용자의 상태"
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "사용자의 선호 카테고리 (선택 사항)"
 *     responses:
 *       200:
 *         description: 회원 가입 성공 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: "SUCCESS"
 *                 success:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: "회원 고유 ID"
 *                     email:
 *                       type: string
 *                       description: "회원 이메일"
 *                     name:
 *                       type: string
 *                       description: "회원 이름"
 *                     gender:
 *                       type: string
 *                       description: "회원 성별"
 *                     location:
 *                       type: string
 *                       description: "회원 위치 정보"
 *                     mobileNumber:
 *                       type: string
 *                       description: "회원 휴대전화 번호"
 *                     birth:
 *                       type: string
 *                       format: date
 *                       description: "회원 생년월일"
 *                     address:
 *                       type: string
 *                       description: "회원 주소"
 *                     userType:
 *                       type: string
 *                       description: "회원 유형"
 *                     userState:
 *                       type: string
 *                       description: "회원 상태"
 *                     point:
 *                       type: integer
 *                       description: "회원 포인트"
 *                     preferences:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: "회원 선호 카테고리"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: "FAIL"
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: "U001"
 *                     reason:
 *                       type: string
 *                     data:
 *                       type: object
 *                 success:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: "FAIL"
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: "unknown"
 *                     reason:
 *                       type: string
 *                     data:
 *                       type: object
 *                 success:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
export const handleUserSignUp = async (req, res) => {
  try {
    console.log("회원가입을 요청했습니다.");
    console.log("req body:", req.body);

    const user = await userSignUp(bodyToUser(req.body));

    res.status(StatusCodes.OK).success(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: error.errorCode || "회원가입 오류 발생",
      reason: error.message,
      data: error.data || null,
    });
  }

  
};
