import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FormularioAgendar {
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
}