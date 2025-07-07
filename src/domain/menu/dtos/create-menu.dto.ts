import { MenuCategory } from "@infrastructure/database/models/menu-item.model";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsEnum(MenuCategory)
  category: MenuCategory;
}
