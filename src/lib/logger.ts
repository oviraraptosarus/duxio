import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: {
    service: "duxio-rebuild",
  },
  redact: ["password", "passwordHash", "headers.authorization"],
});
