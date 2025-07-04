import { Customer } from "@infrastructure/database/models/customer.model";
import { MenuItem } from "@infrastructure/database/models/menu-item.model";
import { OrderItem } from "@infrastructure/database/models/order-item.model";
import { Order } from "@infrastructure/database/models/order.model";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadModels: true,
      logging: false,
      models: [Customer, Order, OrderItem, MenuItem],
    }),
  ],
})
export class DatabaseModule {}
