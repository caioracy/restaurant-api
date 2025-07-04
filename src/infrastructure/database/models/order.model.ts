import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Customer } from "./customer.model";
import { OrderItem } from "./order-item.model";

export enum OrderStatus {
  PENDING = "pending",
  PREPARING = "preparing",
  READY = "ready",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

@Table({ tableName: "orders", timestamps: true })
export class Order extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, allowNull: false })
  customerId: number;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    allowNull: false,
    defaultValue: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @HasMany(() => OrderItem)
  items: OrderItem[];
}
