import { Exclude } from "class-transformer";
import { ARRAY_CONTAINS } from "class-validator";
import { userInfo } from "os";
import { User } from "src/auth/user.entity";
import { Task } from "src/task/task.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectStatus } from "./project.model";

@Entity()
export class Project{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;    

    @Column()
    description: string; 

    @Column()
    status: ProjectStatus; 

    @ManyToMany(type => User, user => user.projects, {cascade: ["insert", "update"]})
    @JoinTable()
    users: User[];

    @ManyToMany(type => Task, task => task.project, {cascade: ["insert", "update"]})
    @JoinTable()
    tasks: Task[];
}