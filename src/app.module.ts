import * as Modules from "@infrastructure/modules";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [...Object.values(Modules)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
