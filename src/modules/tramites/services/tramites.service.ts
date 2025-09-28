import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tramite } from '../entities/tramites.entity';
import { CreateTramiteDto, UpdateTramiteDto } from '../dtos/create-tramite.dto';
import { FilterTramiteDto } from '../dtos/filterTramites.dto';

@Injectable()
export class TramitesService {
  constructor(
    @InjectRepository(Tramite)
    private readonly tramiteRepo: Repository<Tramite>,
  ) {}

  async create(dto: CreateTramiteDto): Promise<Tramite> {
    const tramite = this.tramiteRepo.create(dto);
    return this.tramiteRepo.save(tramite);
  }

  async findAll(filters?: FilterTramiteDto): Promise<Tramite[]> {
    const qb = this.tramiteRepo
      .createQueryBuilder('tramite')
      .leftJoinAndSelect('tramite.usuario', 'usuario')
      .leftJoinAndSelect('tramite.tipo', 'tipo');

    if (filters?.usuario_id) {
      qb.andWhere('tramite.usuario_id = :usuario_id', {
        usuario_id: filters.usuario_id,
      });
    }
    if (filters?.tipo_id) {
      qb.andWhere('tramite.tipo_id = :tipo_id', { tipo_id: filters.tipo_id });
    }
    if (filters?.estado) {
      qb.andWhere('tramite.estado = :estado', { estado: filters.estado });
    }

    return qb.getMany();
  }

  async findOne(id: number): Promise<Tramite> {
    const tramite = await this.tramiteRepo.findOne({
      where: { id },
      relations: ['usuario', 'tipo'],
    });
    if (!tramite)
      throw new NotFoundException(`Trámite con id ${id} no encontrado`);
    return tramite;
  }

  async update(id: number, dto: UpdateTramiteDto): Promise<Tramite> {
    const tramite = await this.findOne(id);
    Object.assign(tramite, dto);
    return this.tramiteRepo.save(tramite);
  }

  async remove(id: number): Promise<void> {
    const tramite = await this.findOne(id);
    await this.tramiteRepo.remove(tramite);
  }
}
