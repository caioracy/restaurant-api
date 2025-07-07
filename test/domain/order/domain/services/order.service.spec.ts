import { OrderService } from "@domain/order/services/order.service";
import { CreateOrderAction } from "@domain/order/actions/create-order.action";
import { UpdateOrderStatusAction } from "@domain/order/actions/update-status.action";
import { GetOrderByCustomerAction } from "@domain/order/actions/get-order-by-customer.action";
import { CreateOrderDto } from "@domain/order/dtos/create-order.dto";
import { UpdateStatusDto } from "@domain/order/dtos/update-order.dto";
import { GetAllByCustomerDto } from "@domain/order/dtos/get-order-by-customer.dto";
import {
  Order,
  OrderStatus,
} from "@infrastructure/database/models/order.model";

describe("OrderService", () => {
  const mockCreateOrderAction = {
    do: jest.fn(),
  };

  const mockUpdateOrderStatusAction = {
    do: jest.fn(),
  };

  const mockGetOrderByCustomerAction = {
    do: jest.fn(),
  };

  const service = new OrderService(
    mockCreateOrderAction as unknown as CreateOrderAction,
    mockUpdateOrderStatusAction as unknown as UpdateOrderStatusAction,
    mockGetOrderByCustomerAction as unknown as GetOrderByCustomerAction
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call createOrderAction.do with dto and return result", async () => {
    const dto = { customerId: 1, items: [] } as CreateOrderDto;
    const expectedOrder = { id: 1 } as Order;

    mockCreateOrderAction.do.mockResolvedValue(expectedOrder);

    const result = await service.create(dto);

    expect(mockCreateOrderAction.do).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedOrder);
  });

  it("should call updateOrderStatusAction.do with dto and return result", async () => {
    const dto = { orderId: 1, status: OrderStatus.READY } as UpdateStatusDto;
    const updatedOrder = { id: 1, status: OrderStatus.READY } as Order;

    mockUpdateOrderStatusAction.do.mockResolvedValue(updatedOrder);

    const result = await service.updateStatus(dto);

    expect(mockUpdateOrderStatusAction.do).toHaveBeenCalledWith(dto);
    expect(result).toEqual(updatedOrder);
  });

  it("should call getOrderByCustomerAction.do with customerId and params", async () => {
    const customerId = 1;
    const params = { page: 1, limit: 10 } as GetAllByCustomerDto;
    const response = {
      data: [],
      meta: { total: 0, page: 1, limit: 10, pages: 0 },
    };

    mockGetOrderByCustomerAction.do.mockResolvedValue(response);

    const result = await service.getOrderByCustomer(customerId, params);

    expect(mockGetOrderByCustomerAction.do).toHaveBeenCalledWith(
      customerId,
      params
    );
    expect(result).toEqual(response);
  });
});
