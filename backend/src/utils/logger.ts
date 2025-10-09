import { blue, yellow, red, gray } from "colorette";

type LogLevel = "info" | "warn" | "error" | "debug";

function format(level: LogLevel, message: string) {
  const time = new Date().toISOString();
  const prefix = `[${time}] [${level.toUpperCase()}]`;
  return `${prefix} ${message}`;
}

export const logger = {
  info: (msg: string) => console.log(blue(format("info", msg))),
  warn: (msg: string) => console.warn(yellow(format("warn", msg))),
  error: (msg: string) => console.error(red(format("error", msg))),
  debug: (msg: string) => {
    if (process.env.NODE_ENV === "development") {
      console.debug(gray(format("debug", msg)));
    }
  },
};
