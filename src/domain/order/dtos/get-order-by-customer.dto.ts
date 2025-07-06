import { OrderItem } from "@infrastructure/database/models/order-item.model";
import { PaginationMeta } from "@infrastructure/interfaces/pagination.interface";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class GetAllByCustomerDto {
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

export class GetOrderByCustomerResponse {
  data: OrderWithTotal[];
  meta: PaginationMeta;
}

export class OrderWithTotal {
  declare items: OrderItem[];
  total: number;
}
