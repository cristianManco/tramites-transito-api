import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { TipoTramite } from '../entities/tipoTramite.entity';
import {
  CreateTipoTramiteDto,
  UpdateTipoTramiteDto,
} from '../dtos/tipo-tramite.dto';

@Injectable()
export class TipoTramiteService {
  constructor(
    @InjectRepository(TipoTramite)
    private readonly tipoTramiteRepo: Repository<TipoTramite>,
  ) {}

  async create(dto: CreateTipoTramiteDto): Promise<TipoTramite> {
    const exists = await this.tipoTramiteRepo.findOne({
      where: { nombre: dto.nombre },
    });
    if (exists)
      throw new ConflictException(
        `El tipo de trámite "${dto.nombre}" ya existe`,
      );

    const tipo = this.tipoTramiteRepo.create(dto);
    return this.tipoTramiteRepo.save(tipo);
  }

  async findAll(filters?: { nombre?: string }): Promise<TipoTramite[]> {
    const where = filters?.nombre
      ? { nombre: ILike(`%${filters.nombre}%`) }
      : {};
    return this.tipoTramiteRepo.find({ where, order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<TipoTramite> {
    const tipo = await this.tipoTramiteRepo.findOne({ where: { id } });
    if (!tipo)
      throw new NotFoundException(`Tipo de trámite con id ${id} no encontrado`);
    return tipo;
  }

  async update(id: number, dto: UpdateTipoTramiteDto): Promise<TipoTramite> {
    const tipo = await this.findOne(id);
    Object.assign(tipo, dto);
    return this.tipoTramiteRepo.save(tipo);
  }

  async remove(id: number): Promise<void> {
    const tipo = await this.findOne(id);
    await this.tipoTramiteRepo.remove(tipo);
  }
}
