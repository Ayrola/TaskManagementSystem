import { User } from "src/auth/user.entity";
import { Project } from "src/project/project.entity";

export interface Task{
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    user: User;
    project: Project[]
}

export enum TaskStatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    BLOCKED = 'BLOCKED',
}