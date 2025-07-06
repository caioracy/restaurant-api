import {
  Order,
  OrderStatus,
} from "@infrastructure/database/models/order.model";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UpdateStatusDto } from "../dtos/update-order.dto";

@Injectable()
export class UpdateOrderStatusAction {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order
  ) {}
  do = async (dto: UpdateStatusDto): Promise<Order> => {
    const order = await this.orderModel.findByPk(dto.orderId);
    if (!order) {
      throw new BadRequestException(
        `Order with ID ${dto.orderId} does not exist`
      );
    }

    if (!Object.values(OrderStatus).includes(dto.status as OrderStatus)) {
      throw new BadRequestException(
        `Invalid status: ${dto.status}. Valid statuses are: ${Object.values(OrderStatus).join(", ")}`
      );
    }

    const updatedOrder = await order.update({
      status: dto.status as OrderStatus,
    });

    return updatedOrder;
  };
}
