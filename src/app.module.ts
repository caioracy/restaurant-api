import * as Modules from "@infrastructure/modules";
import { Module } from "@nestjs/common";

@Module({
  imports: [...Object.values(Modules)],
})
export class AppModule {}
