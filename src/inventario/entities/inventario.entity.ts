import { UsuarioAdmin } from "src/usuario_admin/entities/usuario_admin.entity"
import { Column, PrimaryGeneratedColumn,Entity, ManyToOne } from "typeorm"

@Entity()
export class Inventario {
    @PrimaryGeneratedColumn ()
    id: number
    @Column ()
    nombre_producto: string
    @Column ()
    foto_producto: string
    @Column ()
    descripcion_producto: string
    @Column ()
    cantidad_producto: number
    @ManyToOne (type => UsuarioAdmin, usuarioadmin => usuarioadmin.inventario)
    usuarioadmin: UsuarioAdmin;
}


