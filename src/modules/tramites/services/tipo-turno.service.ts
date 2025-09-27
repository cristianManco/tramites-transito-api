import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Turno } from '../entities/turnos.entity';
import { CreateTurnoDto, UpdateTurnoDto } from '../dtos/turno.dto';
import { TurnoEstado } from '../entities/tramites.enum';

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepo: Repository<Turno>,
  ) {}

  async create(dto: CreateTurnoDto): Promise<Turno> {
    const turno = this.turnoRepo.create(dto);
    return this.turnoRepo.save(turno);
  }

  async findAll(filters?: {
    asesor_id?: number;
    ciudadano_id?: number;
    estado?: TurnoEstado;
    fechaInicio?: string;
    fechaFin?: string;
  }): Promise<Turno[]> {
    const where: any = {};

    if (filters?.asesor_id) where.asesor_id = filters.asesor_id;
    if (filters?.ciudadano_id) where.ciudadano_id = filters.ciudadano_id;
    if (filters?.estado) where.estado = filters.estado;

    if (filters?.fechaInicio && filters?.fechaFin) {
      where.fecha = Between(
        new Date(filters.fechaInicio),
        new Date(filters.fechaFin),
      );
    } else if (filters?.fechaInicio) {
      where.fecha = MoreThanOrEqual(new Date(filters.fechaInicio));
    } else if (filters?.fechaFin) {
      where.fecha = LessThanOrEqual(new Date(filters.fechaFin));
    }

    return this.turnoRepo.find({
      where,
      relations: ['asesor', 'ciudadano', 'tramite'],
      order: { fecha: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Turno> {
    const turno = await this.turnoRepo.findOne({
      where: { id },
      relations: ['asesor', 'ciudadano', 'tramite'],
    });
    if (!turno) throw new NotFoundException(`Turno con id ${id} no encontrado`);
    return turno;
  }

  async update(id: number, dto: UpdateTurnoDto): Promise<Turno> {
    const turno = await this.findOne(id);
    Object.assign(turno, dto);
    return this.turnoRepo.save(turno);
  }

  async remove(id: number): Promise<void> {
    const turno = await this.findOne(id);
    await this.turnoRepo.remove(turno);
  }
}
