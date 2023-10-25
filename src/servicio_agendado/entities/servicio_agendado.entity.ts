import { type } from 'os';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { EstadoServicio } from 'src/estado_servicio/entities/estado_servicio.entity';

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
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToOne(type => EstadoServicio, estadoservicio => estadoservicio.servicioagendado)
  estadoservicio: EstadoServicio;
}
