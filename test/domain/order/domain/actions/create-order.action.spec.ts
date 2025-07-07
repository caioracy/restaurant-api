import { CreateOrderAction } from "@domain/order/actions/create-order.action";
import { Order } from "@infrastructure/database/models/order.model";
import { Customer } from "@infrastructure/database/models/customer.model";
import { MenuItem } from "@infrastructure/database/models/menu-item.model";
import { OrderItem } from "@infrastructure/database/models/order-item.model";
import { NotFoundException } from "@nestjs/common";

describe("CreateOrderAction", () => {
  const mockOrderModel = {
    create: jest.fn(),
  };

  const mockCustomerModel = {
    findByPk: jest.fn(),
  };

  const mockMenuItemModel = {
    findAll: jest.fn(),
  };

  const action = new CreateOrderAction(
    mockOrderModel as unknown as typeof Order,
    mockCustomerModel as unknown as typeof Customer,
    mockMenuItemModel as unknown as typeof MenuItem
  );

  const validDto = {
    customerId: 1,
    items: [
      { menuItemId: 1, quantity: 2 },
      { menuItemId: 2, quantity: 1 },
    ],
  };

  const mockCustomer = { id: 1, name: "Caio" } as Customer;
  const mockMenuItems = [
    { id: 1, name: "Burger" } as MenuItem,
    { id: 2, name: "Fries" } as MenuItem,
  ];
  const mockOrder = { id: 123, customerId: 1, items: validDto.items } as Order;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw if customer does not exist", async () => {
    mockCustomerModel.findByPk.mockResolvedValue(null);

    await expect(action.do(validDto)).rejects.toThrow(NotFoundException);
    expect(mockCustomerModel.findByPk).toHaveBeenCalledWith(
      validDto.customerId
    );
  });

  it("should throw if any menu item is missing", async () => {
    mockCustomerModel.findByPk.mockResolvedValue(mockCustomer);
    mockMenuItemModel.findAll.mockResolvedValue([mockMenuItems[0]]); // only one found

    await expect(action.do(validDto)).rejects.toThrow(
      /Menu Item\(s\) not found with ID/
    );
    expect(mockMenuItemModel.findAll).toHaveBeenCalledWith({
      where: { id: [1, 2] },
    });
  });

  it("should throw if any item has invalid quantity", async () => {
    const invalidDto = {
      customerId: 1,
      items: [
        { menuItemId: 1, quantity: 2 },
        { menuItemId: 2, quantity: 0 }, // invalid quantity
      ],
    };
    mockCustomerModel.findByPk.mockResolvedValue(mockCustomer);
    mockMenuItemModel.findAll.mockResolvedValue(mockMenuItems);

    await expect(action.do(invalidDto)).rejects.toThrow(
      /Menu items with invalid quantity/
    );
  });

  it("should create order successfully", async () => {
    mockCustomerModel.findByPk.mockResolvedValue(mockCustomer);
    mockMenuItemModel.findAll.mockResolvedValue(mockMenuItems);
    mockOrderModel.create.mockResolvedValue(mockOrder);

    const result = await action.do(validDto);

    expect(mockOrderModel.create).toHaveBeenCalledWith(
      {
        customerId: validDto.customerId,
        items: validDto.items.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        })),
      },
      { include: [OrderItem] }
    );

    expect(result).toEqual(mockOrder);
  });

  it("should throw wrapped NotFoundException on unexpected error", async () => {
    mockCustomerModel.findByPk.mockRejectedValue(new Error("DB failure"));

    await expect(action.do(validDto)).rejects.toThrow(
      /Error creating order: DB failure/
    );
  });
});
