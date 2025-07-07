import { CreateMenuItemAction } from "@domain/menu/actions/create-menu-item.action";
import { CreateMenuDto } from "@domain/menu/dtos/create-menu.dto";
import {
  MenuCategory,
  MenuItem,
} from "@infrastructure/database/models/menu-item.model";
import { BadRequestException } from "@nestjs/common";

describe("CreateMenuItemAction", () => {
  const mockModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const action = new CreateMenuItemAction(
    mockModel as unknown as typeof MenuItem
  );

  const validDto: CreateMenuDto = {
    name: "X-Burger",
    price: 25,
    description: "Delicious burger",
    category: MenuCategory.MAIN_COURSE,
  };

  const mockMenuItem: MenuItem = {
    id: 1,
    name: validDto.name,
    price: validDto.price,
    description: validDto.description,
  } as MenuItem;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a menu item when data is valid and name does not exist", async () => {
    mockModel.findOne.mockResolvedValue(null);
    mockModel.create.mockResolvedValue(mockMenuItem);

    const result = await action.do(validDto);

    expect(mockModel.findOne).toHaveBeenCalledWith({
      where: { name: validDto.name },
    });
    expect(mockModel.create).toHaveBeenCalledWith(validDto);
    expect(result).toEqual(mockMenuItem);
  });

  it("should throw if price is less than 0", async () => {
    const invalidDto = { ...validDto, price: -5 };

    await expect(action.do(invalidDto)).rejects.toThrow(BadRequestException);
    expect(mockModel.findOne).not.toHaveBeenCalled();
    expect(mockModel.create).not.toHaveBeenCalled();
  });

  it("should throw if menu item with same name already exists", async () => {
    mockModel.findOne.mockResolvedValue(mockMenuItem);

    await expect(action.do(validDto)).rejects.toThrow(BadRequestException);
    expect(mockModel.findOne).toHaveBeenCalledWith({
      where: { name: validDto.name },
    });
    expect(mockModel.create).not.toHaveBeenCalled();
  });
});
