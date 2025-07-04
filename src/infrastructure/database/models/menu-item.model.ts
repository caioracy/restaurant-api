import { Column, DataType, Model, Table } from "sequelize-typescript";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export enum MenuCategory {
  STARTER = "starter",
  MAIN_COURSE = "main_course",
  DESSERT = "dessert",
  DRINK = "drink",
}

@Table({ tableName: "menu_item", timestamps: true })
export class MenuItem extends Model<
  InferAttributes<MenuItem>,
  InferCreationAttributes<MenuItem>
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price: number;

  @Column({
    type: DataType.ENUM(...Object.values(MenuCategory)),
    allowNull: false,
  })
  category: MenuCategory;
}
