import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Customer } from "@infrastructure/database/models/customer.model";
import { CustomerService } from "@domain/customer/services/customer.service";
import { CustomerController } from "@application/controllers/customer.controller";
import { LoggerModule } from "./logger.module";
import { CreateCustomerAction } from "@domain/action/create-customer.action";

@Module({
  imports: [LoggerModule.forRoot(), SequelizeModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService, CreateCustomerAction],
})
export class CustomerModule extends LoggerModule {}
