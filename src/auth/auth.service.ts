import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AuthRepository } from "./auth.repository";
import { JwtService } from "@nestjs/jwt";
import { Auth } from "./entities/auth.entity";

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<Auth>> {
    const user = await this.findOne(email);
    if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async findOne(email: string): Promise<Auth> {
    return await this.authRepository.findOne(email);
  }

  async login(user: any) {
    const payload = {
      user: {
        id: user.user.id,
        email: user.user.email,
        createdat: user.user.createdat,
        updatedat: user.user.updatedat,
      },
    };
    return await this.jwtService.sign(payload);
  }

  async register(data): Promise<Partial<Auth>> {
    data.password = await bcrypt.hash(data.password, 10);
    const response = await this.authRepository.create(data);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }

  async getProfile(user: Partial<Auth>) {
    const data = await this.authRepository.findOne(user.email);
    if (data) {
      const { password, ...result } = data;
      return result;
    }
  }
}
