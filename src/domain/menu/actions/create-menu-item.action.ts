import { MenuItem } from "@infrastructure/database/models/menu-item.model";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMenuDto } from "../dtos/create-menu.dto";

@Injectable()
export class CreateMenuItemAction {
  constructor(
    @InjectModel(MenuItem)
    private menuItemModel: typeof MenuItem
  ) {}

  do = async (dto: CreateMenuDto): Promise<MenuItem> => {
    if (dto.price < 0)
      throw new BadRequestException("Price must be equal or greater than zero");

    const menuItem = await this.menuItemModel.findOne({
      where: { name: dto.name },
    });

    if (menuItem)
      throw new BadRequestException(
        `Menu item with name ${dto.name} already exists`
      );

    return this.menuItemModel.create(dto);
  };
}
