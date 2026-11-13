import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "guitarras",
})
class Guitar extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  marca: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  modelo: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  precio: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  descripcion: string;
}

export default Guitar;
