import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TipoTramite } from './tipoTramite.entity';

@Entity('tramites')
export class Tramite {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.tramites)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @Column()
  usuario_id: number;

  @ManyToOne(() => TipoTramite, (tipo) => tipo.tramites)
  @JoinColumn({ name: 'tipo_id' })
  tipo: TipoTramite;

  @Column()
  tipo_id: number;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'en_proceso', 'aprobado', 'rechazado'],
    default: 'pendiente',
  })
  estado: 'pendiente' | 'en_proceso' | 'aprobado' | 'rechazado';

  @Column({ type: 'timestamp with time zone' })
  fecha_inicio: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  fecha_fin?: Date;

  @Column({ type: 'jsonb', nullable: true })
  datos_extra?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
