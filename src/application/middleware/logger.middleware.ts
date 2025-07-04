import { Injectable, NestMiddleware } from "@nestjs/common";
import { Logger } from "@application/decorators/logger.decorator";
import { LoggerService } from "@domain/logger/services/logger.service";
import { LoggerDTO } from "@domain/logger/dto/logger.dto";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Logger("LoggerMiddleware") private readonly Log: LoggerService
  ) {}

  use(req: Request, _res: Response, next: any) {
    const context: LoggerDTO = { method: "use", module: "LoggerMiddleware" };
    this.Log.logger(req?.body, context);
    next();
  }
}
