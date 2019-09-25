import { Model, AutoIncrement, PrimaryKey, AllowNull, Column, DataType, Table, ForeignKey, BelongsTo } from "sequelize-typescript";

import User from "./user.model";

@Table({
  timestamps: true,
})
export default class Info extends Model<Info> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public user_pk: number;

  @Column(DataType.STRING)
  public temperature: string;

  @Column(DataType.STRING)
  public humidity: string;

  @Column(DataType.STRING)
  public feel: string;

  @Column(DataType.DATE)
  public createdAt: Date;
  @Column(DataType.DATE)
  public updatedAt: Date;

  @BelongsTo(() => User)
  public user: User;
}