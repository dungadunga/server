import { Model, AutoIncrement, PrimaryKey, AllowNull, Column, DataType, Table, HasOne, HasMany } from "sequelize-typescript";

import Info from "./info.model";
import Diary from "./diary.model";

@Table({
    timestamps: true,
})
export default class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public pk: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    public email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    public password: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    public phone: string;

    @Column(DataType.STRING)
    public platform: 'google' | 'facebook';

    @Column(DataType.INTEGER)
    public platform_pk: number;
    
    @Column(DataType.DATE)
    public createdAt: Date;
    @Column(DataType.DATE)
    public updatedAt: Date;

    @HasOne(() => Info)
    public info: Info;
    @HasMany(() => Diary)
    public diary: Diary[];
}