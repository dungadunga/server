import { Model, AutoIncrement, PrimaryKey, AllowNull, Column, DataType, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

import User from "./user.model";
import DiaryImage from "./diaryImage.model";

@Table({
  timestamps: true,
})
export default class Diary extends Model<Diary> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public user_pk: number;

  @Column(DataType.TEXT)
  public content: string;

  @Column(DataType.DATE)
  public createdAt: Date;
  @Column(DataType.DATE)
  public updatedAt: Date;

  @BelongsTo(() => User)
  public user: User;
  @HasMany(() => DiaryImage)
  public image: DiaryImage[];
}