import { User } from "src/auth/user.entity";

export interface Task{
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    user: User
}

export enum TaskStatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    BLOCKED = 'BLOCKED',
}