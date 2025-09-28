import { IsOptional, IsEnum, IsNumber } from 'class-validator';
import { TramiteEstado } from '../entities/tramites.enum';

export class FilterTramiteDto {
  @IsOptional()
  @IsNumber()
  usuario_id?: number;

  @IsOptional()
  @IsNumber()
  tipo_id?: number;

  @IsOptional()
  @IsEnum(TramiteEstado)
  estado?: TramiteEstado;
}
