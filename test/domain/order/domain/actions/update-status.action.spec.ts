import { UpdateOrderStatusAction } from "@domain/order/actions/update-status.action";
import {
  Order,
  OrderStatus,
} from "@infrastructure/database/models/order.model";
import { BadRequestException } from "@nestjs/common";

describe("UpdateOrderStatusAction", () => {
  const mockOrderInstance = {
    update: jest.fn(),
  };

  const mockOrderModel = {
    findByPk: jest.fn(),
  };

  const action = new UpdateOrderStatusAction(
    mockOrderModel as unknown as typeof Order
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw if order does not exist", async () => {
    mockOrderModel.findByPk.mockResolvedValue(null);

    await expect(
      action.do({ orderId: 1, status: OrderStatus.PENDING })
    ).rejects.toThrow(BadRequestException);

    expect(mockOrderModel.findByPk).toHaveBeenCalledWith(1);
  });

  it("should throw if status is invalid", async () => {
    mockOrderModel.findByPk.mockResolvedValue(mockOrderInstance);

    await expect(
      action.do({ orderId: 1, status: "invalid-status" as any })
    ).rejects.toThrow(BadRequestException);
  });

  it("should update order status successfully", async () => {
    const updatedOrder = { id: 1, status: OrderStatus.DELIVERED };

    mockOrderInstance.update.mockResolvedValue(updatedOrder);
    mockOrderModel.findByPk.mockResolvedValue(mockOrderInstance);

    const result = await action.do({
      orderId: 1,
      status: OrderStatus.DELIVERED,
    });

    expect(mockOrderInstance.update).toHaveBeenCalledWith({
      status: OrderStatus.DELIVERED,
    });

    expect(result).toEqual(updatedOrder);
  });
});
