import { User } from "../authentication/user.module";
import { TasksModel } from "../tasks/tasksResponseData";

export class ProjectModel{
    id: string;
    title: string;
    description: string;
    status: string;
    users: User[];
    tasks: TasksModel[];
}