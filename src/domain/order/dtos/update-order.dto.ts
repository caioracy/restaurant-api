import { OrderStatus } from "@infrastructure/database/models/order.model";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class UpdateStatusDto {
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
