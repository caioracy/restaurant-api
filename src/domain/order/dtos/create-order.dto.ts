import { OrderStatus } from "@infrastructure/database/models/order.model";
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @IsArray()
  @ArrayNotEmpty()
  items: CreateOrderItemDto[];

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus = OrderStatus.PENDING;
}

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsInt()
  menuItemId: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
