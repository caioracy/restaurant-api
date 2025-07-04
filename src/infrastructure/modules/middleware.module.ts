import { NestModule, Type } from "@nestjs/common";
import { MiddlewareConsumer, RouteInfo } from "@nestjs/common/interfaces";

export type RoutesMiddlewareType = (string | Type<any> | RouteInfo)[];

export interface MiddlewareModule extends NestModule {
  routes: RoutesMiddlewareType;
}

export class MiddlewareModules implements NestModule {
  protected middlewares: MiddlewareModule[] = [];

  constructor(
    protected routes: RoutesMiddlewareType,
    protected middlewaresType: Type<MiddlewareModule>[]
  ) {
    middlewaresType.forEach((Middleware) => {
      this.middlewares[this.middlewares.push(new Middleware()) - 1].routes =
        this.routes;
    });
  }

  configure(consumer: MiddlewareConsumer) {
    this.middlewares.forEach((middleware) => middleware.configure(consumer));
  }
}
