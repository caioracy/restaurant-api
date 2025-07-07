import { CustomerService } from "@domain/customer/services/customer.service";
import { CreateCustomerAction } from "@domain/customer/action/create-customer.action";
import { CreateCustomerDto } from "@domain/customer/dtos/create-customer.dto";
import { Customer } from "@infrastructure/database/models/customer.model";

describe("CustomerService", () => {
  const mockCreateAction = {
    do: jest.fn(),
  };

  const service = new CustomerService(
    mockCreateAction as unknown as CreateCustomerAction
  );

  const dto: CreateCustomerDto = {
    name: "Caio",
    email: "caio@email.com",
    phone: "11999999999",
  };

  const mockCustomer: Customer = {
    id: 1,
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
  } as Customer;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call CreateCustomerAction.do with correct DTO", async () => {
    mockCreateAction.do.mockResolvedValue(mockCustomer);

    const result = await service.create(dto);

    expect(mockCreateAction.do).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockCustomer);
  });
});
