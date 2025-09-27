import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { UserRole } from '../entities/user.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'juan@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'StrongPassword123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    enum: [UserRole.ADMIN, UserRole.ASESOR, UserRole.CIUDADANO],
    example: 'ciudadano',
  })
  @IsEnum([UserRole.ADMIN, UserRole.ASESOR, UserRole.CIUDADANO])
  role: UserRole;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
