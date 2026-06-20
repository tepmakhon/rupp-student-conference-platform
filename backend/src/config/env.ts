import dotenv from "dotenv";

dotenv.config();

export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
};

const JWT_SECRET =

process.env.JWT_SECRET;

if (!JWT_SECRET) {
 throw new Error(
 "JWT_SECRET missing"
 );
}

export {
 JWT_SECRET,
};