import { DataSource, TreeRepositoryNotSupportedError } from 'typeorm';
import { User } from './user.entity';

export const authProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
