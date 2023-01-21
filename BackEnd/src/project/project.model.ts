import { User } from "src/auth/user.entity";
import { Task } from "src/task/task.entity";

export interface Project{
    id: string;
    title: string;
    description: string;
    status: ProjectStatus;
    users: User[]
    tasks: Task[]
}

export enum ProjectStatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    BLOCKED = 'BLOCKED',
}