import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tramite } from './tramites.entity';

@Entity('tipos_tramite')
export class TipoTramite {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  nombre: string; // "Licencia", "Multa", "Comparendo", "Turno asesor"

  @Column({ nullable: true })
  descripcion?: string;

  @OneToMany(() => Tramite, (tramite) => tramite.tipo)
  tramites: Tramite[];
}
