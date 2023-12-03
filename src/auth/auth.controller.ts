import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/auth.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginDTO } from "./dto/loginUser.dto";
import { Auth } from "./entities/auth.entity";

@Controller("users")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Request() req: Request,
    @Body() body: LoginDTO
  ): Promise<{
    jwt: string;
  }> {
    const data = await this.authService.login(req);
    return { jwt: data };
  }

  @Post("register")
  @UseFilters()
  async register(
    @Body() body: CreateUserDto
  ): Promise<{ user: Partial<Auth> }> {
    const data = await this.authService.register(body);
    return { user: data };
  }

  @UseGuards(JwtAuthGuard)
  @Get("user")
  async getProfile(@Request() req): Promise<{
    user: Partial<Auth>;
  }> {
    const data = await this.authService.getProfile(req.user);
    return { user: data };
  }
}
