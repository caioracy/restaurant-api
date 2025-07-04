import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Order } from "./order.model";
import { MenuItem } from "./menu-item.model";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

@Table({ tableName: "order_item", timestamps: true })
export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: CreationOptional<number>;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: false })
  orderId: number;

  @ForeignKey(() => MenuItem)
  @Column({ type: DataType.INTEGER, allowNull: false })
  menuItemId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;
}
