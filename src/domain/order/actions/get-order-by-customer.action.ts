import { Customer } from "@infrastructure/database/models/customer.model";
import { Order } from "@infrastructure/database/models/order.model";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import {
  GetAllByCustomerDto,
  GetOrderByCustomerResponse,
} from "../dtos/get-order-by-customer.dto";
import { OrderItem } from "@infrastructure/database/models/order-item.model";
import { MenuItem } from "@infrastructure/database/models/menu-item.model";

@Injectable()
export class GetOrderByCustomerAction {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(Customer)
    private customerModel: typeof Customer
  ) {}

  do = async (
    customerId: number,
    params: GetAllByCustomerDto
  ): Promise<GetOrderByCustomerResponse> => {
    const customer = await this.customerModel.findByPk(customerId);
    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${customerId} does not exist`
      );
    }

    const { page = 1, limit = 10 } = params;

    const where = customerId ? { customerId } : undefined;

    const offset = (page - 1) * limit;

    const { rows, count } = await this.orderModel.findAndCountAll({
      where,
      limit,
      offset,
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: MenuItem,
              attributes: ["name", "price", "category"],
            },
          ],
        },
      ],
    });

    const ordersWithTotal = rows.map((order) => {
      const plain = order.toJSON();
      const total = plain.items.reduce((acc, item) => {
        const price = item.menuItem?.price ?? 0;
        const quantity = item.quantity ?? 0;
        return acc + price * quantity;
      }, 0);
      return {
        ...plain,
        total,
      };
    });

    return {
      data: ordersWithTotal,
      meta: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit),
      },
    };
  };
}
