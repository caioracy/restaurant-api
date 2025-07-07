import { MenuService } from "@domain/menu/services/menu.service";
import { CreateMenuItemAction } from "@domain/menu/actions/create-menu-item.action";
import { GetMenuByCategoryAction } from "@domain/menu/actions/get-menu-by-category.action";
import { CreateMenuDto } from "@domain/menu/dtos/create-menu.dto";
import {
  getAllByCategoryDto,
  GetMenuByCategoryResponse,
} from "@domain/menu/dtos/get-menu-by-category.dto";
import {
  MenuCategory,
  MenuItem,
} from "@infrastructure/database/models/menu-item.model";

describe("MenuService", () => {
  const mockCreateAction = {
    do: jest.fn(),
  };
  const mockGetByCategoryAction = {
    do: jest.fn(),
  };

  const service = new MenuService(
    mockCreateAction as unknown as CreateMenuItemAction,
    mockGetByCategoryAction as unknown as GetMenuByCategoryAction
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call createMenuItemAction.do with correct dto", async () => {
    const dto: CreateMenuDto = {
      name: "X-Burger",
      description: "Delicious burger",
      price: 25,
      category: MenuCategory.MAIN_COURSE,
    };
    const mockMenuItem = { id: 1, ...dto } as MenuItem;

    mockCreateAction.do.mockResolvedValue(mockMenuItem);

    const result = await service.create(dto);

    expect(mockCreateAction.do).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockMenuItem);
  });

  it("should call getMenyByCategoryAction.do with correct dto", async () => {
    const dto: getAllByCategoryDto = {
      category: MenuCategory.MAIN_COURSE,
      page: 2,
      limit: 10,
    };
    const mockResponse: GetMenuByCategoryResponse = {
      data: [],
      meta: {
        total: 0,
        page: 2,
        limit: 10,
        pages: 0,
      },
    };

    mockGetByCategoryAction.do.mockResolvedValue(mockResponse);

    const result = await service.getAllByCategory(dto);

    expect(mockGetByCategoryAction.do).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockResponse);
  });
});
