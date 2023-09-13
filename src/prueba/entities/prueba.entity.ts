import { Column, PrimaryGeneratedColumn, Entity } from "typeorm"
@Entity () 
export class Prueba {
    @PrimaryGeneratedColumn ()
    id: number
    @Column ()
    nombre: string
    @Column ()
    apellido: string
}
