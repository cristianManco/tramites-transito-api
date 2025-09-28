import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateTramiteDto, UpdateTramiteDto } from '../dtos/create-tramite.dto';
import { FilterTramiteDto } from '../dtos/filterTramites.dto';
import { TramitesService } from '../services/tramites.service';

@ApiTags('Trámites')
@Controller('tramites')
export class TramitesController {
  constructor(private readonly tramitesService: TramitesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo trámite' })
  @ApiBody({
    type: CreateTramiteDto,
    description: 'Datos requeridos para crear un trámite',
  })
  @ApiResponse({ status: 201, description: 'Trámite creado correctamente' })
  async create(@Body() dto: CreateTramiteDto) {
    return await this.tramitesService.create(dto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'Obtener todos los trámites con filtros opcionales',
  })
  @ApiBody({
    type: FilterTramiteDto,
    required: false,
    description: 'Filtros opcionales para listar trámites',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de trámites encontrados',
    isArray: true,
  })
  async findAll(@Query() filters: FilterTramiteDto) {
    return await this.tramitesService.findAll(filters);
  }

  @Get('details/:id')
  @ApiOperation({ summary: 'Obtener un trámite por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del trámite a consultar',
  })
  @ApiResponse({ status: 200, description: 'Trámite encontrado' })
  @ApiResponse({ status: 404, description: 'Trámite no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tramitesService.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Actualizar un trámite existente' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del trámite a actualizar',
  })
  @ApiBody({
    type: UpdateTramiteDto,
    description: 'Datos a actualizar en el trámite',
  })
  @ApiResponse({
    status: 200,
    description: 'Trámite actualizado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Trámite no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTramiteDto,
  ) {
    return await this.tramitesService.update(id, dto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Eliminar un trámite por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del trámite a eliminar',
  })
  @ApiResponse({ status: 204, description: 'Trámite eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Trámite no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.tramitesService.remove(id);
  }
}
