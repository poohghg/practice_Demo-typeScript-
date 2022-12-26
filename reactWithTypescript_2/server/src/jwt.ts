import { sign, verify } from "jsonwebtoken";

export const generateAccessToken = (id: string) => {
  return sign({ userCd: id }, process.env.JWT_CLIENT_ID!, {
    expiresIn: "1 days",
  });
};

export const verifyAccessToken = (token: string) => {
  return verify(token, process.env.JWT_CLIENT_ID!);
};
