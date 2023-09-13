import { Servicio } from "src/servicio/entities/servicio.entity"
import { UsuarioAdmin } from "src/usuario_admin/entities/usuario_admin.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"

@Entity()
export class NuestrosTrabajo {
    @PrimaryGeneratedColumn ()
    id: number
    @Column()
    nombre_trabajo: string
    @Column()
    foto_trabajo: string
    @Column()
    descripcion_trabajo: string
    @ManyToOne(type => UsuarioAdmin, usuarioadmin => usuarioadmin.nuestrostrabajo)
    usuarioadmin: UsuarioAdmin; 
    


    
}
