import { type } from "os"
import { Usuario } from "src/usuario/entities/usuario.entity"
import { UsuarioAdmin } from "src/usuario_admin/entities/usuario_admin.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Contacto {
    @PrimaryGeneratedColumn ()
    id: number
    @Column ()
    nombre_mensaje: string
    @Column ()
    apellido_mensaje: string
    @Column ()
    email_mensaje: string
    @Column ()
    telefono_mensaje: number
    @Column ()
    mensaje_mensaje: string
    @ManyToOne(type => UsuarioAdmin, usuarioadmin => usuarioadmin.contacto)
    usuarioadmin: UsuarioAdmin[];
    @ManyToOne(type => Usuario, usuario => usuario.contacto)
    usuario: Usuario;
}
