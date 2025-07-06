import { Module } from "@nestjs/common";
import { LoggerModule } from "./logger.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "@infrastructure/database/models/order.model";
import { OrderController } from "@application/controllers/order.controller";
import { OrderService } from "@domain/order/services/order.service";
import { CreateOrderAction } from "@domain/order/actions/create-order.action";
import { MenuItem } from "@infrastructure/database/models/menu-item.model";
import { Customer } from "@infrastructure/database/models/customer.model";
import { UpdateOrderStatusAction } from "@domain/order/actions/update-status.action";
import { GetOrderByCustomerAction } from "@domain/order/actions/get-order-by-customer.action";

@Module({
  imports: [SequelizeModule.forFeature([Order, MenuItem, Customer])],
  controllers: [OrderController],
  providers: [
    OrderService,
    CreateOrderAction,
    UpdateOrderStatusAction,
    GetOrderByCustomerAction,
  ],
})
export class OrderModule {}
