import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { Auth } from "./auth/entities/auth.entity";
import { Task } from "./tasks/entities/task.entity";

config();

const configService = new ConfigService();

export default new DataSource({
  type: "postgres",
  host: configService.get("DB_HOST"),
  port: configService.get("DB_PORT"),
  username: configService.get("DB_USER"),
  password: configService.get("DB_PASSWORD"),
  database: configService.get("DB_DATABASE"),
  entities: [Auth, Task],
  logging: ["info"],
  synchronize: true,
});
