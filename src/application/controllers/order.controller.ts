import { CreateOrderDto } from "@domain/order/dtos/create-order.dto";
import {
  GetAllByCustomerDto,
  GetOrderByCustomerResponse,
} from "@domain/order/dtos/get-order-by-customer.dto";
import { OrderService } from "@domain/order/services/order.service";
import {
  Order,
  OrderStatus,
} from "@infrastructure/database/models/order.model";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

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

  @Get("customer/:customerId")
  async getOrderByCustomer(
    @Param("customerId") customerId: number,
    @Query() params: GetAllByCustomerDto
  ): Promise<GetOrderByCustomerResponse> {
    return this.orderService.getOrderByCustomer(customerId, params);
  }
}
