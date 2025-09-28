import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTipoTramiteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdateTipoTramiteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
