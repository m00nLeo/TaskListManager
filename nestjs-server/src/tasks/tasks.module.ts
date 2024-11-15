import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Register Task entity here
  ],
  controllers: [TasksController], // Controller
  providers: [TasksService], // Model
  exports: [TasksService], // Export if you need to use this service in another module
})
export class TasksModule {}
