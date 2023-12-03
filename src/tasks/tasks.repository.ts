import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>
  ) {}

  async findAllTasks(): Promise<Task[]> {
    return await this.taskRepo.find();
  }
  async createTask(
    data: Partial<Task>
  ): Promise<void | (Partial<Task> & Task)> {
    return await this.taskRepo
      .save(data)
      .then((res) => res)
      .catch((e) => console.log(e));
  }
}
