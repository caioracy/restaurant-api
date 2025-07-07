import "reflect-metadata";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { GetAllByCustomerDto } from "@domain/order/dtos/get-order-by-customer.dto";

describe("GetAllByCustomerDto Validation", () => {
  it("should pass validation with no fields (all optional)", async () => {
    const dto = plainToInstance(GetAllByCustomerDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should pass with valid page and limit", async () => {
    const dto = plainToInstance(GetAllByCustomerDto, {
      page: 1,
      limit: 10,
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail if page is zero or negative or decimal", async () => {
    const dtoZero = plainToInstance(GetAllByCustomerDto, { page: 0 });
    const errorsZero = await validate(dtoZero);
    expect(errorsZero.some((e) => e.property === "page")).toBe(true);

    const dtoNegative = plainToInstance(GetAllByCustomerDto, { page: -1 });
    const errorsNegative = await validate(dtoNegative);
    expect(errorsNegative.some((e) => e.property === "page")).toBe(true);

    const dtoDecimal = plainToInstance(GetAllByCustomerDto, { page: 2.5 });
    const errorsDecimal = await validate(dtoDecimal);
    expect(errorsDecimal.some((e) => e.property === "page")).toBe(true);
  });

  it("should fail if limit is zero or negative or decimal", async () => {
    const dtoZero = plainToInstance(GetAllByCustomerDto, { limit: 0 });
    const errorsZero = await validate(dtoZero);
    expect(errorsZero.some((e) => e.property === "limit")).toBe(true);

    const dtoNegative = plainToInstance(GetAllByCustomerDto, { limit: -5 });
    const errorsNegative = await validate(dtoNegative);
    expect(errorsNegative.some((e) => e.property === "limit")).toBe(true);

    const dtoDecimal = plainToInstance(GetAllByCustomerDto, { limit: 3.7 });
    const errorsDecimal = await validate(dtoDecimal);
    expect(errorsDecimal.some((e) => e.property === "limit")).toBe(true);
  });
});
