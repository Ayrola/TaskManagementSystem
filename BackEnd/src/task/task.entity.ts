import { Exclude } from "class-transformer";
import { userInfo } from "os";
import { User } from "src/auth/user.entity";
import { Project } from "src/project/project.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.model";

@Entity()
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;    

    @Column()
    description: string; 

    @Column()
    status: TaskStatus; 

    @ManyToOne(type => User, user => user.tasks, {eager: false})
    @Exclude({toPlainOnly: true})
    user: User;

    @ManyToOne(type => Project, project => project.tasks, {eager: false})
    @JoinColumn({name: 'project_Id'})
    project: Project;
}