import { GetOrderByCustomerAction } from "@domain/order/actions/get-order-by-customer.action";
import { Order } from "@infrastructure/database/models/order.model";
import { Customer } from "@infrastructure/database/models/customer.model";
import { OrderItem } from "@infrastructure/database/models/order-item.model";
import { MenuItem } from "@infrastructure/database/models/menu-item.model";
import { NotFoundException } from "@nestjs/common";

describe("GetOrderByCustomerAction", () => {
  const mockOrderModel = {
    findAndCountAll: jest.fn(),
  };
  const mockCustomerModel = {
    findByPk: jest.fn(),
  };

  const action = new GetOrderByCustomerAction(
    mockOrderModel as unknown as typeof Order,
    mockCustomerModel as unknown as typeof Customer
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw if customer does not exist", async () => {
    mockCustomerModel.findByPk.mockResolvedValue(null);

    await expect(action.do(1, {})).rejects.toThrow(NotFoundException);
    expect(mockCustomerModel.findByPk).toHaveBeenCalledWith(1);
  });

  it("should return paginated orders with total", async () => {
    const customer = { id: 1, name: "Caio" };
    mockCustomerModel.findByPk.mockResolvedValue(customer);

    const mockOrders = [
      {
        toJSON: () => ({
          id: 10,
          customerId: 1,
          items: [
            {
              quantity: 2,
              menuItem: { price: 10 },
            },
            {
              quantity: 1,
              menuItem: { price: 5 },
            },
          ],
        }),
      },
      {
        toJSON: () => ({
          id: 11,
          customerId: 1,
          items: [
            {
              quantity: 3,
              menuItem: { price: 7 },
            },
          ],
        }),
      },
    ];

    mockOrderModel.findAndCountAll.mockResolvedValue({
      rows: mockOrders,
      count: 2,
    });

    const params = { page: 1, limit: 10 };

    const result = await action.do(1, params);

    expect(mockOrderModel.findAndCountAll).toHaveBeenCalledWith({
      where: { customerId: 1 },
      limit: 10,
      offset: 0,
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: MenuItem,
              attributes: ["name", "price", "category"],
            },
          ],
        },
      ],
    });

    expect(result).toEqual({
      data: [
        {
          id: 10,
          customerId: 1,
          items: mockOrders[0].toJSON().items,
          total: 25, // (2*10 + 1*5)
        },
        {
          id: 11,
          customerId: 1,
          items: mockOrders[1].toJSON().items,
          total: 21, // (3*7)
        },
      ],
      meta: {
        total: 2,
        page: 1,
        limit: 10,
        pages: 1,
      },
    });
  });
});
