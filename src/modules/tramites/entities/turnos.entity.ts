import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('turnos')
export class Turno {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'asesor_id' })
  asesor: User;

  @Column()
  asesor_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ciudadano_id' })
  ciudadano: User;

  @Column()
  ciudadano_id: number;

  @Column({ type: 'timestamp with time zone' })
  fecha: Date;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'atendido', 'cancelado'],
    default: 'pendiente',
  })
  estado: 'pendiente' | 'atendido' | 'cancelado';
}
