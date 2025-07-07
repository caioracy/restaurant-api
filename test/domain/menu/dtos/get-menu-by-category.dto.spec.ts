import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { getAllByCategoryDto } from "@domain/menu/dtos/get-menu-by-category.dto";
import { MenuCategory } from "@infrastructure/database/models/menu-item.model";

describe("getAllByCategoryDto Validation", () => {
  it("should pass with empty data (all optional)", async () => {
    const dto = plainToInstance(getAllByCategoryDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should pass with valid category, page and limit", async () => {
    const dto = plainToInstance(getAllByCategoryDto, {
      category: MenuCategory.MAIN_COURSE,
      page: 1,
      limit: 10,
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail if category is invalid", async () => {
    const dto = plainToInstance(getAllByCategoryDto, {
      category: "invalid-category",
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === "category")).toBe(true);
  });

  it("should fail if page is not a positive integer", async () => {
    const dto1 = plainToInstance(getAllByCategoryDto, { page: 0 });
    const errors1 = await validate(dto1);
    expect(errors1.some((e) => e.property === "page")).toBe(true);

    const dto2 = plainToInstance(getAllByCategoryDto, { page: -1 });
    const errors2 = await validate(dto2);
    expect(errors2.some((e) => e.property === "page")).toBe(true);

    const dto3 = plainToInstance(getAllByCategoryDto, { page: 1.5 });
    const errors3 = await validate(dto3);
    expect(errors3.some((e) => e.property === "page")).toBe(true);
  });

  it("should fail if limit is not a positive integer", async () => {
    const dto1 = plainToInstance(getAllByCategoryDto, { limit: 0 });
    const errors1 = await validate(dto1);
    expect(errors1.some((e) => e.property === "limit")).toBe(true);

    const dto2 = plainToInstance(getAllByCategoryDto, { limit: -5 });
    const errors2 = await validate(dto2);
    expect(errors2.some((e) => e.property === "limit")).toBe(true);

    const dto3 = plainToInstance(getAllByCategoryDto, { limit: 2.7 });
    const errors3 = await validate(dto3);
    expect(errors3.some((e) => e.property === "limit")).toBe(true);
  });
});
