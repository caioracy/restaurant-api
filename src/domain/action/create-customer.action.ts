import { CreateCustomerDto } from "@domain/customer/dtos/create-customer.dto";
import IAction from "@domain/IAction";
import { Customer } from "@infrastructure/database/models/customer.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CreateCustomerAction implements IAction {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer
  ) {}

  do = async (dto: CreateCustomerDto): Promise<Customer> => {
    return this.customerModel.create(dto);
  };
}
