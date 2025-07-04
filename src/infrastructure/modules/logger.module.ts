import { MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "@application/middleware/logger.middleware";
import { DynamicModule } from "@nestjs/common/interfaces";

import { createLoggerProviders } from "@domain/logger/providers/logger.provider";
import { LoggerService } from "@domain/logger/services/logger.service";
import { Error, Log, Warning } from "@domain/logger/actions";
import { MiddlewareModule } from "./middleware.module";

export class LoggerModule implements MiddlewareModule {
  routes = [];
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(...this.routes);
  }
  static forRoot(): DynamicModule {
    const prefixedLoggerProviders = createLoggerProviders();
    return {
      module: LoggerModule,
      imports: [],
      providers: [
        Error,
        Log,
        Warning,
        LoggerService,
        ...prefixedLoggerProviders,
      ],
      exports: [LoggerService, ...prefixedLoggerProviders],
    };
  }
}
