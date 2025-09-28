import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTramiteDto, UpdateTramiteDto } from '../dtos/create-tramite.dto';
import { FilterTramiteDto } from '../dtos/filterTramites.dto';
import { TramitesService } from '../services/tramites.service';

@Controller('tramites')
export class TramitesController {
  constructor(private readonly tramitesService: TramitesService) {}

  @Post('create')
  async create(@Body() dto: CreateTramiteDto) {
    return await this.tramitesService.create(dto);
  }

  @Get('all')
  async findAll(@Query() filters: FilterTramiteDto) {
    return await this.tramitesService.findAll(filters);
  }

  @Get('details/:id')
  async findOne(@Param('id') id: string) {
    return await this.tramitesService.findOne(+id);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateTramiteDto) {
    return await this.tramitesService.update(+id, dto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.tramitesService.remove(+id);
  }
}
