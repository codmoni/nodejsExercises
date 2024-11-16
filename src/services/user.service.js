import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferenceByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import { UserType } from "@prisma/client";
import { DuplicateUserEmailError } from "../utils/error.js";

// 회원 가입(회원 생성)
export const userSignUp = async (data) => {
  const createdUser = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    location: data.location,
    mobileNumber: data.mobileNumber,
    birth: data.birth,
    address: data.address,
    password: data.password,
    passwordConfirm: data.passwordConfirm,
    userType: UserType[data.userType],
    userState: data.userState,
    point: 0,
  });

  if (createdUser == null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(createdUser.id, preference);
  }

  const preferences = await getUserPreferenceByUserId(createdUser.id);

  return responseFromUser({ user: createdUser, preferences });
};
