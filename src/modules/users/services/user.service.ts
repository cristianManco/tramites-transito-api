import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const exists = await this.userRepo.findOne({
        where: { email: dto.email },
      });
      if (exists) {
        throw new ConflictException('El email ya está registrado');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 12);
      const user = this.userRepo.create({
        ...dto,
        password: hashedPassword,
      });

      return await this.userRepo.save(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Error en create():', error);
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepo.find({
        relations: ['tramites'],
      });
    } catch (error) {
      console.error('Error en findAll():', error);
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
        relations: ['tramites'],
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error en findOne():', error);
      throw new InternalServerErrorException('Error al obtener el usuario');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepo.findOne({
        where: { email: email },
        relations: ['tramites'],
      });
      return user || null;
    } catch (error) {
      console.error('Error en findByEmail():', error);
      throw new InternalServerErrorException(
        'Error al obtener el usuario por email',
      );
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);

      if (dto.password) {
        dto.password = await bcrypt.hash(dto.password, 12);
      }

      Object.assign(user, dto);
      return await this.userRepo.save(user);
    } catch (error) {
      console.error('Error en update():', error);
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const user = await this.findOne(id);
      await this.userRepo.remove(user);
    } catch (error) {
      console.error('Error en remove():', error);
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }
}
