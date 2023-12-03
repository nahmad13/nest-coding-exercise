import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Auth } from "./entities/auth.entity";
@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Auth)
    private userRepository: Repository<Auth>
  ) {}

  async findOne(email: string): Promise<Auth | null> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
  async create(data: Partial<Auth>): Promise<void | (Partial<Auth> & Auth)> {
    return await this.userRepository
      .save(data)
      .then((res) => res)
      .catch((e) => console.log(e));
  }
}
