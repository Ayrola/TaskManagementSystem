import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres' as 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'task-management',
        synchronize: true,
        logging: false,
        migrations: [],
        subscribers: [],
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
];
