import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateStatusDto } from "@domain/order/dtos/update-order.dto";
import { OrderStatus } from "@infrastructure/database/models/order.model";

describe("UpdateStatusDto Validation", () => {
  it("should pass with valid data", async () => {
    const dto = plainToInstance(UpdateStatusDto, {
      orderId: 1,
      status: OrderStatus.PENDING,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail if orderId is missing or not an integer", async () => {
    const dto1 = plainToInstance(UpdateStatusDto, {
      status: OrderStatus.READY,
    });

    const dto2 = plainToInstance(UpdateStatusDto, {
      orderId: "abc",
      status: OrderStatus.READY,
    });

    const errors1 = await validate(dto1);
    const errors2 = await validate(dto2);

    expect(errors1.some((e) => e.property === "orderId")).toBe(true);
    expect(errors2.some((e) => e.property === "orderId")).toBe(true);
  });

  it("should fail if status is missing or invalid", async () => {
    const dto1 = plainToInstance(UpdateStatusDto, {
      orderId: 1,
    });

    const dto2 = plainToInstance(UpdateStatusDto, {
      orderId: 1,
      status: "INVALID_STATUS",
    });

    const errors1 = await validate(dto1);
    const errors2 = await validate(dto2);

    expect(errors1.some((e) => e.property === "status")).toBe(true);
    expect(errors2.some((e) => e.property === "status")).toBe(true);
  });
});
