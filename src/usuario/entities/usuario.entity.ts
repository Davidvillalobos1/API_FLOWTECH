import { Contacto } from "src/contacto/entities/contacto.entity"
import { Servicio } from "src/servicio/entities/servicio.entity"
import { Column, PrimaryGeneratedColumn, Entity, OneToOne, OneToMany, ManyToMany, ManyToOne } from "typeorm"

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn ()
    id: number
    @Column ()
    nombre: string
    @Column ()
    apellido: string
    @Column ()
    email: string
    @Column ()
    contrasena: string
    @OneToMany ( type => Contacto, contacto => contacto.usuario)
    contacto: Contacto [];
    @ManyToOne(type => Servicio, servicio => servicio.usuario)
    servicio: Servicio;





}
