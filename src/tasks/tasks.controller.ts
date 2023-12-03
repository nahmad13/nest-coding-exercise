import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./entities/task.entity";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create-task")
  async create(
    @Body() body: CreateTaskDto
  ): Promise<{ task: void | (Partial<Task> & Task) }> {
    const data = await this.tasksService.create(body);
    return { task: data };
  }

  @UseGuards(JwtAuthGuard)
  @Get("list-tasks")
  async findAll(): Promise<{
    tasks: Task[];
  }> {
    const data = await this.tasksService.findAll();
    return { tasks: [...data] };
  }
}
