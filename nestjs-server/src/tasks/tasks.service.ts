// The service handles the business logic and replaces `Functions` in taskModel.js.

import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // Fetch / Read all tasks
  async getTasks(pagePerSheet: number, currentPage: number) {
    // limit (pagePerSheet), offset (currentPage)
    const [result, totalPages] = await this.taskRepository.findAndCount({
      order: { order: 'ASC' },
      take: pagePerSheet,
      skip: (currentPage - 1) * pagePerSheet,
    });

    return {
      result,
      page: currentPage,
      totalPages: Math.ceil(totalPages / pagePerSheet),
      dataLength: totalPages,
    };
  }

  // Create a new task
  async createTask(taskData: Partial<Task>) {
    if (!taskData.date_input) {
      taskData.date_input = new Date(); // Set to current date if undefined
    }
    const task = this.taskRepository.create(taskData);
    return await this.taskRepository.save(task);
  }

  // Update a task and checked state (by axios.patch)
  async updateTask(id: number, taskData: Partial<Task>) {
    await this.taskRepository.update(id, taskData);
    // Pass an object that specifies the ID field, `findOne` look for a task with the given id in its where clause.
    return await this.taskRepository.findOne({ where: { id } });
  }

  // Update task order after drag and drop
  async updateTasksOrder(reorderedList: Partial<Task>[]) {
    for (const task of reorderedList) {
      await this.taskRepository.update(task.id, { order: task.order });
    }
    return { message: 'Order updated successfully!' };
  }

  // Delete a task
  async deleteTask(id: number) {
    await this.taskRepository.delete(id);
    return { message: 'Task deleted successfully!' };
  }
}
