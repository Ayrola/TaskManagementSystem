import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [ConfigModule.forRoot(),TaskModule,AuthModule,ProjectModule]
})
export class AppModule {}
