import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
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
      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }
      return null;
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
          fullName: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      console.error('Error en login():', error);
      throw new InternalServerErrorException('Error al iniciar sesión');
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

      const hashedPassword = await bcrypt.hash(String(userData.password), 10);
      const user = await this.usersService.create({
        ...userData,
        email: String(userData.email),
        name: String(userData.name),
        password: String(hashedPassword),
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
