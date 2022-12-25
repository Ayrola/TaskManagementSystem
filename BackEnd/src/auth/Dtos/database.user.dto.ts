import { User } from "../user.entity";

import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class UserDto{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @Column()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too week'})
    password: string;
}