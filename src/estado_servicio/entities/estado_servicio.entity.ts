import { Servicio } from "src/servicio/entities/servicio.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ServicioAgendado } from "src/servicio_agendado/entities/servicio_agendado.entity";
@Entity()
export class EstadoServicio {

    @PrimaryGeneratedColumn()
    id: number
    @Column ()
    estado_servicio: string
    @OneToMany(type => ServicioAgendado, servicioagendado => servicioagendado.estadoservicio)
    servicioagendado:ServicioAgendado;




}

