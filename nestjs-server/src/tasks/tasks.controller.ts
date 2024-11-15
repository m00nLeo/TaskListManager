// The controller will handle incoming requests and call the service methods accordingly.
// This replaces taskController.js also the route in taskRoute.js

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@Controller('')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Fetch all tasks
  @Get()
  getTasks(
    // @Query('page') for my_api.ts Query params Key 'page'
    // Gets 'page' query param (similar to how req.query works in Express) or defaults to 1
    @Query('page') currentPage = 1,
    @Query('page_per_sheet') pagePerSheet = 3,
  ) {
    return this.tasksService.getTasks(pagePerSheet, currentPage); // limit, offset
  }

  // Create a new task
  @Post('add')
  createTask(@Body() taskData: Partial<Task>) {
    return this.tasksService.createTask(taskData);
  }

  // Update a task and checked state (by axios.patch)
  @Patch('update/:id')
  updateTask(@Param('id') id: number, @Body() taskData: Partial<Task>) {
    return this.tasksService.updateTask(id, taskData);
  }

  // Update task order after drag and drop
  @Put('/')
  updateTasksOrder(@Body() reorderedList: Partial<Task>[]) {
    return this.tasksService.updateTasksOrder(reorderedList);
  }

  // Delete a task
  @Delete('delete/:id')
  deleteTask(@Param() id: number) {
    return this.tasksService.deleteTask(id);
  }
}
