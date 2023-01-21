import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectService } from './project.service';
import { projectProviders } from './project.providers';
import { ProjectController } from './project.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ProjectController],
  providers: [...projectProviders, ProjectService],
})
export class ProjectModule {}
