import {
  IsEnum,
  IsInt,
  IsOptional,
  IsDateString,
  IsObject,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { TramiteEstado } from '../entities/tramites.enum';

export class CreateTramiteDto {
  @IsInt()
  usuario_id: number;

  @IsInt()
  tipo_id: number;

  @IsDateString()
  fecha_inicio: Date;

  @IsOptional()
  @IsDateString()
  fecha_fin?: Date;

  @IsOptional()
  @IsEnum(TramiteEstado)
  estado?: TramiteEstado;

  @IsOptional()
  @IsObject()
  datos_extra?: Record<string, any>;
}

export class UpdateTramiteDto extends PartialType(CreateTramiteDto) {}
