import { Injectable } from "@nestjs/common";
import { Customer } from "@infrastructure/database/models/customer.model";
import { CreateCustomerDto } from "@domain/customer/dtos/create-customer.dto";
import { CreateCustomerAction } from "@domain/customer/action/create-customer.action";

@Injectable()
export class CustomerService {
  constructor(protected createCustomerAction: CreateCustomerAction) {}

  async create(dto: CreateCustomerDto): Promise<Customer> {
    return this.createCustomerAction.do(dto);
  }
}
