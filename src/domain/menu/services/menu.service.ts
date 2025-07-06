import { Injectable } from "@nestjs/common";
import { CreateMenuItemAction } from "../actions/create-menu-item.action";
import { CreateMenuDto } from "../dtos/create-menu.dto";
import { MenuItem } from "@infrastructure/database/models/menu-item.model";
import { GetMenuByCategoryAction } from "../actions/get-menu-by-category.action";
import {
  getAllByCategoryDto,
  GetMenuByCategoryResponse,
} from "../dtos/get-menu-by-category.dto";

@Injectable()
export class MenuService {
  constructor(
    protected createMenuItemAction: CreateMenuItemAction,
    protected getMenyByCategoryAction: GetMenuByCategoryAction
  ) {}

  async create(dto: CreateMenuDto): Promise<MenuItem> {
    return this.createMenuItemAction.do(dto);
  }

  async getAllByCategory(
    dto: getAllByCategoryDto
  ): Promise<GetMenuByCategoryResponse> {
    return this.getMenyByCategoryAction.do(dto);
  }
}
