import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateOrderDto } from "@domain/order/dtos/create-order.dto";
import { OrderStatus } from "@infrastructure/database/models/order.model";

describe("CreateOrderDto Validation", () => {
  const validPayload = {
    customerId: 1,
    items: [
      { menuItemId: 10, quantity: 2 },
      { menuItemId: 20, quantity: 1 },
    ],
    status: OrderStatus.PENDING,
  };

  it("should validate successfully with valid data", async () => {
    const dto = plainToInstance(CreateOrderDto, validPayload);
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail if customerId is missing or not a number", async () => {
    const dto1 = plainToInstance(CreateOrderDto, {
      ...validPayload,
      customerId: undefined,
    });
    const errors1 = await validate(dto1);
    expect(errors1.some((e) => e.property === "customerId")).toBe(true);

    const dto2 = plainToInstance(CreateOrderDto, {
      ...validPayload,
      customerId: "abc",
    });
    const errors2 = await validate(dto2);
    expect(errors2.some((e) => e.property === "customerId")).toBe(true);
  });

  it("should fail if items is missing, empty or not an array", async () => {
    const dto1 = plainToInstance(CreateOrderDto, {
      ...validPayload,
      items: undefined,
    });
    const errors1 = await validate(dto1);
    expect(errors1.some((e) => e.property === "items")).toBe(true);

    const dto2 = plainToInstance(CreateOrderDto, {
      ...validPayload,
      items: [],
    });
    const errors2 = await validate(dto2);
    expect(errors2.some((e) => e.property === "items")).toBe(true);

    const dto3 = plainToInstance(CreateOrderDto, {
      ...validPayload,
      items: "not-array",
    });
    const errors3 = await validate(dto3);
    expect(errors3.some((e) => e.property === "items")).toBe(true);
  });

  it("should fail if any item in items has invalid menuItemId or quantity", async () => {
    const dto1 = plainToInstance(CreateOrderDto, {
      ...validPayload,
      items: [{ menuItemId: undefined, quantity: 1 }],
    });
    const errors1 = await validate(dto1);
    expect(errors1.some((e) => e.property === "items")).toBe(true);

    const dto2 = plainToInstance(CreateOrderDto, {
      ...validPayload,
      items: [{ menuItemId: 10, quantity: "abc" }],
    });
    const errors2 = await validate(dto2);
    expect(errors2.some((e) => e.property === "items")).toBe(true);
  });

  it("should pass if status is missing (optional)", async () => {
    const { status, ...withoutStatus } = validPayload;
    const dto = plainToInstance(CreateOrderDto, withoutStatus);
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail if status is invalid", async () => {
    const dto = plainToInstance(CreateOrderDto, {
      ...validPayload,
      status: "invalid-status",
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === "status")).toBe(true);
  });
});
