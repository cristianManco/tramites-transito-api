import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from '../service/auth.service';
// import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { LocalAuthGuard } from 'src/common/guards/local.guard';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({
    type: RegisterDto,
    description: 'Datos requeridos para registrar un nuevo usuario',
  })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente' })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o usuario ya existe',
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión con credenciales' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'usuario@test.com' },
        password: { type: 'string', example: '123456' },
      },
    },
    description: 'Credenciales del usuario para autenticación',
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso, devuelve JWT u objeto de sesión',
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('profile')
  // @ApiOperation({ summary: 'Obtener perfil del usuario autenticado (requiere JWT)' })
  // @ApiResponse({ status: 200, description: 'Perfil del usuario autenticado' })
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
