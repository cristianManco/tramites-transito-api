import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

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

  @ApiProperty({ enum: ['admin', 'asesor', 'ciudadano'], example: 'ciudadano' })
  @IsEnum(['admin', 'asesor', 'ciudadano'])
  role: 'admin' | 'asesor' | 'ciudadano';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
