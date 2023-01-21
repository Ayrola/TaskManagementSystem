import { Project } from "src/project/project.entity";
import { Task } from "src/task/task.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @ManyToOne(type => Task, task => task.user, {eager: true})    
    tasks: Task[]

    @ManyToMany(type => Project, project => project.users, {eager: true})    
    projects: Project[]

    addUser(project: Project)
    {
        if(this.projects == null)
        {
            this.projects = new Array<Project>();
        }
        this.projects.push(project);
    }
}