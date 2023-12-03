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

@Controller("users")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: Request, @Body() body: LoginDTO) {
    return this.authService.login(req);
  }

  @Post("register")
  @UseFilters()
  async register(@Request() req: Request, @Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get("user")
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user);
  }
}
