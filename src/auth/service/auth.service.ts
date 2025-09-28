import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { UserRole } from 'src/modules/users/entities/user.enum';
import { UsersService } from 'src/modules/users/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findByEmail(email);
      console.warn('Usuario encontrado en validateUser:', user);
      console.warn('Usuario encontrado:', user?.email);
      console.warn('Password recibido en login:', password);
      console.warn('Password hash guardado:', user?.password);

      if (!user || !user.password) {
        return null;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.warn('Resultado bcrypt.compare:', isMatch);

      if (!isMatch) return null;

      return user;
    } catch (error) {
      console.error('Error en validateUser():', error);
      throw new InternalServerErrorException('Error al validar el usuario');
    }
  }

  login(user: User) {
    try {
      const payload = { email: user.email, sub: user.id, role: user.role };
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      console.error('Error en login():', error);
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error al iniciar sesión', error);
    }
  }

  async register(userData: Partial<User>) {
    try {
      const userExists = await this.usersService.findByEmail(
        String(userData.email),
      );
      if (userExists) {
        throw new UnauthorizedException('El correo ya está en uso');
      }
      console.warn('Datos recibidos en register:', userData);

      const user = await this.usersService.create({
        ...userData,
        email: String(userData.email),
        name: String(userData.name),
        password: String(userData.password),
        role: userData.role ?? UserRole.CIUDADANO,
      });

      return this.login(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Error en register():', error);
      throw new InternalServerErrorException('Error al registrar el usuario');
    }
  }
}
