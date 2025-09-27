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
import { TipoTramiteService } from '../services/tipo-tramite.service';
import {
  CreateTipoTramiteDto,
  UpdateTipoTramiteDto,
} from '../dtos/tipo-tramite.dto';

@Controller('types-tramite')
export class TipoTramiteController {
  constructor(private readonly tipoTramiteService: TipoTramiteService) {}

  @Post('create')
  async create(@Body() dto: CreateTipoTramiteDto) {
    return await this.tipoTramiteService.create(dto);
  }

  @Get('all')
  async findAll(@Query('nombre') nombre?: string) {
    return await this.tipoTramiteService.findAll({ nombre });
  }

  @Get('details/:id')
  async findOne(@Param('id') id: string) {
    return await this.tipoTramiteService.findOne(+id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateTipoTramiteDto) {
    return await this.tipoTramiteService.update(+id, dto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.tipoTramiteService.remove(+id);
  }
}
