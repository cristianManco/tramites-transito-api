import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from 'src/modules/users/entities/user.enum';

export class RegisterDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
