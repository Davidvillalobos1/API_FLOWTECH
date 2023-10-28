import { type } from "os"
import { Usuario } from "src/usuario/entities/usuario.entity"
import { UsuarioAdmin } from "src/usuario_admin/entities/usuario_admin.entity"
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Servicio {
    @PrimaryGeneratedColumn ()
    id: number;

    @Column ()
    nombre_servicio: string;

    @Column ("longtext")
    foto_servicio: string;

    @Column ()
    descripcion_servicio: string;

    @Column ()
    precio_servicio: number;






    @ManyToOne (type => UsuarioAdmin, usuarioadmin => usuarioadmin.servicio)
    usuarioadmin: UsuarioAdmin;
    
    @OneToMany(type => Usuario, usuario => usuario.servicio)
    usuario: Usuario;
}
