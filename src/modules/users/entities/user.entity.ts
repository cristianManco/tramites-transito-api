import { Tramite } from 'src/modules/tramites/entities/tramites.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './user.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 200, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: [UserRole.ADMIN, UserRole.ASESOR, UserRole.CIUDADANO],
    default: UserRole.CIUDADANO,
  })
  role: UserRole;

  @OneToMany(() => Tramite, (tramite) => tramite.usuario)
  tramites: Tramite[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
