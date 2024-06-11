import env from 'dotenv';
env.config();
export const config= {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_SENDER: process.env.MAIL_SENDER,
  OAUTH_CLIENTID: process.env.OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN
};
