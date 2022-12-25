import { Task } from "src/task/task.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @ManyToOne(type => Task, task => task.user, {eager: true})    
    tasks: Task[]
}