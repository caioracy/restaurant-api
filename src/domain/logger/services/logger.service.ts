import { Logger, Injectable } from "@nestjs/common";
import { LoggerDTO } from "@domain/logger/dto/logger.dto";
import { Error, Log, Warning } from "../actions";

@Injectable()
export class LoggerService extends Logger {
  constructor(
    context: string,
    private readonly logAction: Log,
    private readonly errorAction: Error,
    private readonly warningAction: Warning
  ) {
    super(context);
    [this.logAction, this.errorAction, this.warningAction].forEach((action) =>
      action?.setOwner(this)
    );
  }
  logger(message: any, context?: LoggerDTO) {
    return this.logAction.do(message, context);
  }

  err(message: any, context: LoggerDTO) {
    return this.errorAction.do(message, context);
  }

  warning(message: any, context: LoggerDTO) {
    return this.warningAction.do(message, context);
  }
}
