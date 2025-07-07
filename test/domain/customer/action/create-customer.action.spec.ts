import { CreateCustomerAction } from "@domain/customer/action/create-customer.action";
import { CreateCustomerDto } from "@domain/customer/dtos/create-customer.dto";
import { BadRequestException } from "@nestjs/common";

describe("CreateCustomerAction", () => {
  const mockCustomerModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const action = new CreateCustomerAction(mockCustomerModel as any);

  const dto: CreateCustomerDto = {
    name: "Caio",
    email: "caio@email.com",
    phone: "11999999999",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a customer when email does not exist", async () => {
    mockCustomerModel.findOne.mockResolvedValue(null);
    mockCustomerModel.create.mockResolvedValue({ id: 1, ...dto });

    const result = await action.do(dto);

    expect(mockCustomerModel.findOne).toHaveBeenCalledWith({
      where: { email: dto.email },
    });
    expect(mockCustomerModel.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  it("should throw BadRequestException if customer already exists", async () => {
    mockCustomerModel.findOne.mockResolvedValue({ id: 1, ...dto });

    await expect(action.do(dto)).rejects.toThrow(BadRequestException);
    expect(mockCustomerModel.findOne).toHaveBeenCalledWith({
      where: { email: dto.email },
    });
    expect(mockCustomerModel.create).not.toHaveBeenCalled();
  });
});
