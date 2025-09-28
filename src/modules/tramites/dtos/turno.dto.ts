import { IsEnum, IsInt, IsDateString, IsOptional } from 'class-validator';
import { TurnoEstado } from '../entities/tramites.enum';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTurnoDto {
  @IsInt()
  asesor_id: number;

  @IsInt()
  ciudadano_id: number;

  @IsDateString()
  fecha: Date;

  @IsOptional()
  @IsEnum(TurnoEstado)
  estado?: TurnoEstado;

  @IsOptional()
  tramite_id?: number;
}

export class UpdateTurnoDto extends PartialType(CreateTurnoDto) {}
