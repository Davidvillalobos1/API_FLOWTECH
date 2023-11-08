import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class ServicioAgendado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comuna: string;

  @Column()
  direccion: string;

  @Column()
  telefono: number;

  @Column()
  revision_tecnica: string;

  @ManyToOne(() => Servicio, { eager: true })
  @JoinColumn({ name: 'servicioId' })
  servicio: Servicio;

  @Column()
  estado_servicio: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;


}
