import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { Order } from "@infrastructure/database/models/order.model";
import { InjectModel } from "@nestjs/sequelize";
import { OrderItem } from "@infrastructure/database/models/order-item.model";
import { Customer } from "@infrastructure/database/models/customer.model";
import { MenuItem } from "@infrastructure/database/models/menu-item.model";

@Injectable()
export class CreateOrderAction {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(Customer)
    private customerModel: typeof Customer,
    @InjectModel(MenuItem)
    private menuItemModel: typeof MenuItem
  ) {}

  do = async (dto: CreateOrderDto): Promise<Order> => {
    try {
      const customer = await this.customerModel.findByPk(dto.customerId);
      if (!customer) {
        throw new NotFoundException(
          `Customer with ID ${dto.customerId} does not exist`
        );
      }

      const menuItemIds = dto.items.map((item) => item.menuItemId);
      const menuItems = await this.menuItemModel.findAll({
        where: { id: menuItemIds },
      });

      if (menuItems.length !== menuItemIds.length) {
        const foundIds = menuItems.map((m) => m.id);
        const missing = menuItemIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `Menu Item(s) not found with ID: ${missing.join(", ")}`
        );
      }

      const invalidItems = dto.items.filter((item) => item.quantity <= 0);

      if (invalidItems.length > 0) {
        const invalidDetails = invalidItems
          .map((item) => item.menuItemId)
          .join(", ");

        throw new NotFoundException(
          `Menu items with invalid quantity: ${invalidDetails}`
        );
      }

      const order = await this.orderModel.create(
        {
          customerId: dto.customerId,
          items: dto.items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          })),
        } as any,
        {
          include: [OrderItem],
        }
      );

      return order;
    } catch (error) {
      throw new NotFoundException(`Error creating order: ${error.message}`);
    }
  };
}
