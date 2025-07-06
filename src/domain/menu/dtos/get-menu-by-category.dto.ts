import { IsEnum, IsInt, IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";
import {
  MenuCategory,
  MenuItem,
} from "@infrastructure/database/models/menu-item.model";
import { PaginationMeta } from "@infrastructure/interfaces/pagination.interface";

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

export class GetMenuByCategoryResponse {
  data: MenuItem[];
  meta: PaginationMeta;
}
