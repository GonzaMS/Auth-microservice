import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  SEED: get("SEED").required().asString(),

  SEND_EMAIL: get("SEND_EMAIL").default("false").asBool(),
  MAIL_SERVICE: get("MAIL_SERVICE").required().asString(),
  MAIL: get("MAIL").required().asString(),
  SECRET: get("SECRET").required().asString(),

  WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
};
