import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateCustomerDto } from "@domain/customer/dtos/create-customer.dto";

describe("CreateCustomerDto Validation", () => {
  const validPayload = {
    name: "Caio",
    email: "caio@email.com",
    phone: "11999999999",
  };

  it("should pass with valid data", async () => {
    const dto = plainToInstance(CreateCustomerDto, validPayload);
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail if name is empty", async () => {
    const dto = plainToInstance(CreateCustomerDto, {
      ...validPayload,
      name: "",
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === "name")).toBe(true);
  });

  it("should fail if email is invalid", async () => {
    const dto = plainToInstance(CreateCustomerDto, {
      ...validPayload,
      email: "not-an-email",
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === "email")).toBe(true);
  });

  it("should fail if phone is empty", async () => {
    const dto = plainToInstance(CreateCustomerDto, {
      ...validPayload,
      phone: "",
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === "phone")).toBe(true);
  });
});
