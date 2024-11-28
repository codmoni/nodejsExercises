export const bodyToUser = (body) => {
  const birth = body.birth ? new Date(body.birth) : null;
  if (birth && isNaN(birth.getTime())) {
    throw new Error("유효하지 않은 생년월일입니다.");
  }

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    location: body.location,
    mobileNumber: body.mobileNumber,
    birth: birth,
    address: body.address,
    password: body.password,
    passwordConfirm: body.passwordConfirm,
    userType: body.userType,
    userState: body.userState,
    point: 0,
    preferences: body.preferences || [],
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const birth = user.birth ? new Date(user.birth) : null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    location: user.location,
    mobileNumber: user.mobileNumber,
    birth: birth,
    address: user.address,
    password: user.password,
    passwordConfirm: user.passwordConfirm,
    userType: user.userType,
    userState: user.userState,
    point: user.point || 0,
    preferences: preferences,
  };
};
