import { Injectable } from "@nestjs/common";
import { CreateOrderAction } from "../actions/create-order.action";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { Order } from "@infrastructure/database/models/order.model";
import { UpdateStatusDto } from "../dtos/update-order.dto";
import { UpdateOrderStatusAction } from "../actions/update-status.action";
import {
  GetAllByCustomerDto,
  GetOrderByCustomerResponse,
} from "../dtos/get-order-by-customer.dto";
import { GetOrderByCustomerAction } from "../actions/get-order-by-customer.action";

@Injectable()
export class OrderService {
  constructor(
    protected createOrderAction: CreateOrderAction,
    protected updateOrderStatusAction: UpdateOrderStatusAction,
    protected getOrderByCustomerAction: GetOrderByCustomerAction
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    return this.createOrderAction.do(dto);
  }

  async updateStatus(dto: UpdateStatusDto): Promise<Order> {
    return this.updateOrderStatusAction.do(dto);
  }

  async getOrderByCustomer(
    customerId: number,
    params: GetAllByCustomerDto
  ): Promise<GetOrderByCustomerResponse> {
    return this.getOrderByCustomerAction.do(customerId, params);
  }
}
