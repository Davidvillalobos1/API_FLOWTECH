import { Servicio } from "src/servicio/entities/servicio.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class EstadoServicio {

    @PrimaryGeneratedColumn()
    id: number
    @Column ()
    estado_servicio: string
    @ManyToOne(type => Servicio, servicio => servicio.estadoservicio)
    servicio: EstadoServicio;




}

