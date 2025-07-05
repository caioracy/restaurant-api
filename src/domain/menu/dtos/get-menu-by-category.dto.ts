import { IsEnum, IsInt, IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";
import { MenuCategory } from "@infrastructure/database/models/menu-item.model";

export class getAllByCategoryDto {
  @IsOptional()
  @IsEnum(MenuCategory)
  category?: MenuCategory;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number;
}
