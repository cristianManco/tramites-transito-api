import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from '../service/auth.service';
// import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { LocalAuthGuard } from 'src/common/guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Post('profile')
  //   getProfile(@Request() req) {
  //     const user = req.user;
  //     return user;
  //   }
}
