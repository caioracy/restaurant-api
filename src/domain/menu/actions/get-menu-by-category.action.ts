import {
  MenuCategory,
  MenuItem,
} from "@infrastructure/database/models/menu-item.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import {
  getAllByCategoryDto,
  GetMenuByCategoryResponse,
} from "../dtos/get-menu-by-category.dto";

@Injectable()
export class GetMenuByCategoryAction {
  constructor(
    @InjectModel(MenuItem)
    private menuItemModel: typeof MenuItem
  ) {}

  do = async (dto: getAllByCategoryDto): Promise<GetMenuByCategoryResponse> => {
    const { category, page = 1, limit = 10 } = dto;

    const where = category ? { category } : undefined;

    const offset = (page - 1) * limit;

    const { rows, count } = await this.menuItemModel.findAndCountAll({
      where,
      limit,
      offset,
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit),
      },
    };
  };
}
