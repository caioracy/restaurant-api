import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Order } from "./order.model";
import { MenuItem } from "./menu-item.model";

@Table({ tableName: "order_item", timestamps: true })
export class OrderItem extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: false })
  orderId: number;

  @ForeignKey(() => MenuItem)
  @Column({ type: DataType.INTEGER, allowNull: false })
  menuItemId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;
}
