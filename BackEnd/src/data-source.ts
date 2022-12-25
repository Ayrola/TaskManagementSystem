import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: 'postgres' as 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'task-management',
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})
