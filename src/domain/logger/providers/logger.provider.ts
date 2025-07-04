import { prefixesForLoggers } from "@application/decorators/logger.decorator";
import { Provider } from "@nestjs/common";
import { LoggerService } from "@domain/logger/services/logger.service";
import { Error, Log, Warning } from "../actions";

function createLoggerProvider(prefix: string): Provider<LoggerService> {
  return {
    provide: `LoggerService${prefix}`,
    useFactory: (log: Log, error: Error, warning: Warning) =>
      new LoggerService(prefix, log, error, warning),
    inject: [Log, Error, Warning],
  };
}

export function createLoggerProviders(): Array<Provider<LoggerService>> {
  return prefixesForLoggers.map((prefix) => createLoggerProvider(prefix));
}
