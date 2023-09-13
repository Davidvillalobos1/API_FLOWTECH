import { type } from "os"
import { EstadoServicio } from "src/estado_servicio/entities/estado_servicio.entity"
import { Usuario } from "src/usuario/entities/usuario.entity"
import { UsuarioAdmin } from "src/usuario_admin/entities/usuario_admin.entity"
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Servicio {
    @PrimaryGeneratedColumn ()
    id: number
    @Column ()
    nombre_servicio: string
    @Column ()
    foto_servicio: string
    @Column ()
    descripcion_servicio: string
    @Column ()
    precio_servicio: number
    @ManyToOne (type => UsuarioAdmin, usuarioadmin => usuarioadmin.servicio)
    usuarioadmin: UsuarioAdmin;
    @OneToMany (type => EstadoServicio, estadoservicio => estadoservicio.servicio)
    estadoservicio: EstadoServicio[];
    @OneToMany(type => Usuario, usuario => usuario.servicio)
    usuario: Usuario;
}
