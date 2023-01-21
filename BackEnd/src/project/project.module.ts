import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectService } from './project.service';
import { projectProviders } from './project.providers';
import { ProjectController } from './project.controller';
import { TaskService } from 'src/task/task.service';
import { TaskModule } from 'src/task/task.module';
import { taskProviders } from 'src/task/task.providers';

@Module({
  imports: [DatabaseModule, AuthModule, TaskModule],
  controllers: [ProjectController],
  providers: [...projectProviders, ...taskProviders, ProjectService],
})
export class ProjectModule {}
