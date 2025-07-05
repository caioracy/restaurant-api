import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MenuItem } from "@infrastructure/database/models/menu-item.model";
import { MenuService } from "@domain/menu/services/menu.service";
import { MenuController } from "@application/controllers/menu.controller";
import { LoggerModule } from "./logger.module";
import { CreateMenuItemAction } from "@domain/menu/actions/create-menu-item.action";
import { GetMenuByCategoryAction } from "@domain/menu/actions/get-menu-by-category.action";

@Module({
  imports: [LoggerModule.forRoot(), SequelizeModule.forFeature([MenuItem])],
  controllers: [MenuController],
  providers: [MenuService, CreateMenuItemAction, GetMenuByCategoryAction],
})
export class MenuModule {}
