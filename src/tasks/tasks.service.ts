import { Injectable } from "@nestjs/common";
import { TasksRepository } from "./tasks.repository";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(private taskRepository: TasksRepository) {}
  async create(data: Partial<Task>): Promise<void | (Partial<Task> & Task)> {
    return await this.taskRepository.createTask(data);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.findAllTasks();
  }
}
