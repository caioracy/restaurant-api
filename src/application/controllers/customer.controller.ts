import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CustomerService } from "../../domain/customer/services/customer.service";
import { CreateCustomerDto } from "@domain/customer/dtos/create-customer.dto";
import { Customer } from "@infrastructure/database/models/customer.model";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(dto);
  }
}
