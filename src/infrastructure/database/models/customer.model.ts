import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "customers", timestamps: true })
export class Customer extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;
}
