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
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { TurnoService } from '../services/tipo-turno.service';
import { CreateTurnoDto, UpdateTurnoDto } from '../dtos/turno.dto';
import { TurnoEstado } from '../entities/tramites.enum';

@ApiTags('Turnos')
@Controller('turnos')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo turno' })
  @ApiBody({
    type: CreateTurnoDto,
    description: 'Datos requeridos para crear un turno',
  })
  @ApiResponse({ status: 201, description: 'Turno creado correctamente' })
  async create(@Body() dto: CreateTurnoDto) {
    return await this.turnoService.create(dto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'Obtener todos los turnos (con filtros opcionales)',
  })
  @ApiQuery({
    name: 'asesor_id',
    type: Number,
    required: false,
    description: 'ID del asesor',
  })
  @ApiQuery({
    name: 'ciudadano_id',
    type: Number,
    required: false,
    description: 'ID del ciudadano',
  })
  @ApiQuery({
    name: 'estado',
    enum: TurnoEstado,
    required: false,
    description: 'Estado del turno',
  })
  @ApiQuery({
    name: 'fechaInicio',
    type: String,
    required: false,
    description: 'Fecha inicio (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'fechaFin',
    type: String,
    required: false,
    description: 'Fecha fin (YYYY-MM-DD)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de turnos encontrados',
    isArray: true,
  })
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
  @ApiOperation({ summary: 'Obtener detalles de un turno por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del turno a consultar',
  })
  @ApiResponse({ status: 200, description: 'Turno encontrado' })
  @ApiResponse({ status: 404, description: 'Turno no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.turnoService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Actualizar un turno existente' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del turno a actualizar',
  })
  @ApiBody({
    type: UpdateTurnoDto,
    description: 'Datos a actualizar en el turno',
  })
  @ApiResponse({ status: 200, description: 'Turno actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Turno no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTurnoDto,
  ) {
    return await this.turnoService.update(id, dto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Eliminar un turno por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del turno a eliminar',
  })
  @ApiResponse({ status: 204, description: 'Turno eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Turno no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.turnoService.remove(id);
  }
}
