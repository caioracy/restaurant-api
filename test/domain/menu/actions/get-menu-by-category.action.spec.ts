import { GetMenuByCategoryAction } from "@domain/menu/actions/get-menu-by-category.action";
import {
  MenuCategory,
  MenuItem,
} from "@infrastructure/database/models/menu-item.model";
import { getAllByCategoryDto } from "@domain/menu/dtos/get-menu-by-category.dto";

describe("GetMenuByCategoryAction", () => {
  const mockModel = {
    findAndCountAll: jest.fn(),
  };

  const action = new GetMenuByCategoryAction(
    mockModel as unknown as typeof MenuItem
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return paginated menu items with default pagination", async () => {
    const dto: getAllByCategoryDto = {
      category: undefined,
      page: undefined,
      limit: undefined,
    };

    const mockRows = [
      { id: 1, name: "Item 1", category: "drink" },
      { id: 2, name: "Item 2", category: "starter" },
    ];

    mockModel.findAndCountAll.mockResolvedValue({
      rows: mockRows,
      count: 2,
    });

    const result = await action.do(dto);

    expect(mockModel.findAndCountAll).toHaveBeenCalledWith({
      where: undefined,
      limit: 10,
      offset: 0,
    });

    expect(result).toEqual({
      data: mockRows,
      meta: {
        total: 2,
        page: 1,
        limit: 10,
        pages: 1,
      },
    });
  });

  it("should apply category filter and custom pagination", async () => {
    const dto: getAllByCategoryDto = {
      category: MenuCategory.DRINK,
      page: 2,
      limit: 5,
    };

    const mockRows = [{ id: 3, name: "Item 3", category: "drink" }];

    mockModel.findAndCountAll.mockResolvedValue({
      rows: mockRows,
      count: 6,
    });

    const result = await action.do(dto);

    expect(mockModel.findAndCountAll).toHaveBeenCalledWith({
      where: { category: "drink" },
      limit: 5,
      offset: 5,
    });

    expect(result).toEqual({
      data: mockRows,
      meta: {
        total: 6,
        page: 2,
        limit: 5,
        pages: 2,
      },
    });
  });
});
