import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggerMiddleware } from "@application/middleware/logger.middleware";
import { LoggerService } from "@domain/logger/services/logger.service";
import { Error, Log, Warning } from "@domain/logger/actions";
import { DynamicModule } from "@nestjs/common";
import { createLoggerProviders } from "@domain/logger/providers/logger.provider";

@Module({})
export class LoggerModule implements NestModule {
  static forRoot(): DynamicModule {
    const providers = createLoggerProviders();

    return {
      module: LoggerModule,
      providers: [LoggerService, Error, Log, Warning, ...providers],
      exports: [LoggerService, ...providers],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*"); // Middleware global
  }
}
