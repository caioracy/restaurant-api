import IAction from "@domain/IAction";
import { Logger } from "@nestjs/common";
import { LoggerDTO } from "@domain/logger/dto/logger.dto";

const logMap = {
  ERROR: "error",
  INFO: "log",
  WARNING: "warn",
};

type logType = keyof typeof logMap;

export class Base implements IAction {
  private owner: Logger;
  setOwner = (owner: Logger) => (this.owner = owner);

  constructor(public type: logType) {}
  do = (message: any, context?: LoggerDTO) => {
    const standard = {
      server: "localhost",
      type: this.type,
      time: new Date(Date.now()).toString(),
    };
    const data = { ...standard, ...context, message };
    return this.owner[logMap[this.type]](JSON.stringify(data));
  };
}
