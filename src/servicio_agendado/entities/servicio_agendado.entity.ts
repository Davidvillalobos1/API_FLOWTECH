import { type } from 'os';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @ManyToOne(() => Servicio)
  @JoinColumn({ name: 'servicioId' })
  servicio: any;
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario: any;

}
