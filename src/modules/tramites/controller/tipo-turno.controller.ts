// src/modules/tramites/controllers/turno.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TurnoService } from '../services/tipo-turno.service';
import { CreateTurnoDto, UpdateTurnoDto } from '../dtos/turno.dto';
import { TurnoEstado } from '../entities/tramites.enum';

@Controller('turnos')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @Post('create')
  async create(@Body() dto: CreateTurnoDto) {
    return await this.turnoService.create(dto);
  }

  @Get('all')
  async findAll(
    @Query('asesor_id') asesor_id?: number,
    @Query('ciudadano_id') ciudadano_id?: number,
    @Query('estado') estado?: TurnoEstado,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    return await this.turnoService.findAll({
      asesor_id,
      ciudadano_id,
      estado,
      fechaInicio,
      fechaFin,
    });
  }

  @Get('details/:id')
  async findOne(@Param('id') id: string) {
    return await this.turnoService.findOne(+id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateTurnoDto) {
    return await this.turnoService.update(+id, dto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.turnoService.remove(+id);
  }
}
