import { Model, AutoIncrement, PrimaryKey, AllowNull, Column, DataType, ForeignKey, BelongsTo, Table } from "sequelize-typescript";

import Diary from "./diary.model"

@Table({
  timestamps: true,
})
export default class DiaryImage extends Model<DiaryImage> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @Column(DataType.STRING)
  public url: string;

  @ForeignKey(() => Diary)
  public diary_pk: number;

  @BelongsTo(() => Diary, {
    onDelete: 'CASCADE',
  })
  public diary: Diary;
}