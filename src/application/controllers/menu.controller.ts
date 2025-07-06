import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { MenuService } from "@domain/menu/services/menu.service";
import { MenuItem } from "@infrastructure/database/models/menu-item.model";
import { CreateMenuDto } from "@domain/menu/dtos/create-menu.dto";
import {
  getAllByCategoryDto,
  GetMenuByCategoryResponse,
} from "@domain/menu/dtos/get-menu-by-category.dto";

@Controller("menu")
export class MenuController {
  constructor(private readonly customerService: MenuService) {}

  @Post()
  async createMenu(@Body() dto: CreateMenuDto): Promise<MenuItem> {
    return this.customerService.create(dto);
  }

  @Get()
  async getMenuByCategory(
    @Query() dto: getAllByCategoryDto
  ): Promise<GetMenuByCategoryResponse> {
    return this.customerService.getAllByCategory(dto);
  }
}
