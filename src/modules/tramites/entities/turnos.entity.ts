import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Tramite } from './tramites.entity';
import { TurnoEstado } from './tramites.enum';

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
    enum: TurnoEstado,
    default: TurnoEstado.PENDIENTE,
  })
  estado: TurnoEstado;

  @OneToOne(() => Tramite, (tramite) => tramite.turno, { nullable: true })
  @JoinColumn({ name: 'tramite_id' })
  tramite?: Tramite;

  @Column()
  tramite_id: number;
}
