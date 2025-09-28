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
import { TipoTramiteService } from '../services/tipo-tramite.service';
import {
  CreateTipoTramiteDto,
  UpdateTipoTramiteDto,
} from '../dtos/tipo-tramite.dto';

@ApiTags('Tipos de Trámite')
@Controller('types-tramite')
export class TipoTramiteController {
  constructor(private readonly tipoTramiteService: TipoTramiteService) {}

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo tipo de trámite' })
  @ApiBody({
    type: CreateTipoTramiteDto,
    description: 'Datos requeridos para crear un tipo de trámite',
  })
  @ApiResponse({
    status: 201,
    description: 'Tipo de trámite creado correctamente',
  })
  async create(@Body() dto: CreateTipoTramiteDto) {
    return await this.tipoTramiteService.create(dto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Obtener todos los tipos de trámite' })
  @ApiQuery({
    name: 'nombre',
    required: false,
    description: 'Filtrar por nombre del tipo de trámite',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de trámite encontrados',
    isArray: true,
  })
  async findAll(@Query('nombre') nombre?: string) {
    return await this.tipoTramiteService.findAll({ nombre });
  }

  @Get('details/:id')
  @ApiOperation({ summary: 'Obtener un tipo de trámite por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del tipo de trámite a consultar',
  })
  @ApiResponse({
    status: 200,
    description: 'Tipo de trámite encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de trámite no encontrado',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tipoTramiteService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Actualizar un tipo de trámite existente' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del tipo de trámite a actualizar',
  })
  @ApiBody({
    type: UpdateTipoTramiteDto,
    description: 'Datos a actualizar en el tipo de trámite',
  })
  @ApiResponse({
    status: 200,
    description: 'Tipo de trámite actualizado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de trámite no encontrado',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTipoTramiteDto,
  ) {
    return await this.tipoTramiteService.update(id, dto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Eliminar un tipo de trámite por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del tipo de trámite a eliminar',
  })
  @ApiResponse({
    status: 204,
    description: 'Tipo de trámite eliminado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de trámite no encontrado',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.tipoTramiteService.remove(id);
  }
}
