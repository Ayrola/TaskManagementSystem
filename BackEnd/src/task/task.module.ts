import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { TaskController } from './task.controller';
import { taskProviders } from './task.providers';
import { TaskService } from './task.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TaskController],
  providers: [...taskProviders, TaskService],
})
export class TaskModule {}
