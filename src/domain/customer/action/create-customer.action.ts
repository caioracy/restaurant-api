import { CreateCustomerDto } from "@domain/customer/dtos/create-customer.dto";
import IAction from "@domain/IAction";
import { Customer } from "@infrastructure/database/models/customer.model";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CreateCustomerAction implements IAction {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer
  ) {}

  do = async (dto: CreateCustomerDto): Promise<Customer> => {
    const customer = await this.customerModel.findOne({
      where: { email: dto.email },
    });

    if (customer) {
      throw new BadRequestException(
        `Customer with email ${dto.email} already exists`
      );
    }

    return this.customerModel.create(dto);
  };
}
