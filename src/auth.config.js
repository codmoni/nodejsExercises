import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from "passport-naver";
import dotenv from "dotenv";
import { prisma } from "./db.config.js";

dotenv.config();

const verifyUser = async (email, profile, provider, uniqueId) => {
  try {
    console.log("Verifying user with email:", email, "and uniqueId:", uniqueId);

    if (!email && !uniqueId) {
      throw new Error(`No email or Unique Identifier provided by ${provider}`);
    }

    // 사용자 조회
    let user = await prisma.user.findFirst({
      where: { OR: [{ email }, { uniqueId }] },
    });

    console.log("User found:", user);

    // 기존 사용자가 없으면 생성
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email || `${provider}_${uniqueId}@example.com`,
          name: profile.displayName || profile._json.nickname || "Unknown",
          gender: profile._json.gender || "OTHER",
          location: "추후 수정",
          birth: new Date(2002, 0, 1),
          address: "추후 수정",
          mobile_number: "추후 수정",
          user_type: "USER",
          status: 1,
          point: 0,
          uniqueId,
        },
      });
      console.log("New user created:", user);
    }

    return { id: user.id, email: user.email, name: user.name };
  } catch (error) {
    console.error("Error in verifyUser:", error);
    throw error; 
  }
};


export const googleStrategy = new GoogleStrategy({
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
},
async (accessToken, refreshToken, profile, cb) => {
    try{
        console.log("Google Profile:", profile);
        const email = profile.emails?.[0]?.value;
        const user = await verifyUser(email, profile, "Google");
        cb(null, user);
    } catch (error) {
        cb(error);
    }
}
)

export const naverStrategy = new NaverStrategy(
    {
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/oauth2/callback/naver",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log("Naver Profile:", profile);
        
        const email = profile._json.email || null; // 이메일이 없을 수도 있음
        const uniqueId = profile.id; // 네이버의 Unique Identifier
        const user = await verifyUser(email, profile, "Naver", uniqueId);
        
        console.log("User verified or created:", user);
        cb(null, user);
      } catch (error) {
        cb(error.message);
      }
    }
  );

