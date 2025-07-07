import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateMenuDto } from "@domain/menu/dtos/create-menu.dto";
import { MenuCategory } from "@infrastructure/database/models/menu-item.model";

describe("CreateMenuDto Validation", () => {
  const validPayload = {
    name: "X-Burger",
    description: "Delicious burger",
    price: 25,
    category: MenuCategory.MAIN_COURSE,
  };

  it("should pass with valid data", async () => {
    const dto = plainToInstance(CreateMenuDto, validPayload);
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail if name is empty", async () => {
    const dto = plainToInstance(CreateMenuDto, { ...validPayload, name: "" });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === "name")).toBe(true);
  });

  it("should fail if description is empty", async () => {
    const dto = plainToInstance(CreateMenuDto, {
      ...validPayload,
      description: "",
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === "description")).toBe(true);
  });

  it("should fail if price is missing or not a number", async () => {
    const dto1 = plainToInstance(CreateMenuDto, {
      ...validPayload,
      price: undefined,
    });
    const errors1 = await validate(dto1);
    expect(errors1.some((e) => e.property === "price")).toBe(true);

    const dto2 = plainToInstance(CreateMenuDto, {
      ...validPayload,
      price: "abc",
    });
    const errors2 = await validate(dto2);
    expect(errors2.some((e) => e.property === "price")).toBe(true);
  });

  it("should fail if category is invalid", async () => {
    const dto = plainToInstance(CreateMenuDto, {
      ...validPayload,
      category: "invalid-category",
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === "category")).toBe(true);
  });

  it("should fail if category is missing", async () => {
    const dto = plainToInstance(CreateMenuDto, {
      ...validPayload,
      category: undefined,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === "category")).toBe(true);
  });
});
