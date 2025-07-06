import { CreateOrderDto } from "@domain/order/dtos/create-order.dto";
import { OrderService } from "@domain/order/services/order.service";
import {
  Order,
  OrderStatus,
} from "@infrastructure/database/models/order.model";
import { Body, Controller, Param, Patch, Post } from "@nestjs/common";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(dto);
  }

  @Patch(":orderId")
  async updateOrderStatus(
    @Param("orderId") orderId: number,
    @Body("status") status: OrderStatus
  ): Promise<Order> {
    return this.orderService.updateStatus({ orderId, status });
  }
}
