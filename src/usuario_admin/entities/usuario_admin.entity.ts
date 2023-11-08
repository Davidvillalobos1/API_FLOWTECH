import { Contacto } from "src/contacto/entities/contacto.entity"
import { Inventario } from "src/inventario/entities/inventario.entity"
import { NuestrosTrabajo } from "src/nuestros_trabajos/entities/nuestros_trabajo.entity"
import { Servicio } from "src/servicio/entities/servicio.entity"
import { Column, PrimaryGeneratedColumn, Entity, OneToMany} from "typeorm"


@Entity()
export class UsuarioAdmin {
    @PrimaryGeneratedColumn ()
    id: number;

    @Column()
    email_admin: string;

    @Column()
    contrasena_admin: string;

    @OneToMany (type => Contacto, contacto => contacto.usuarioadmin)
    contacto: Contacto[];
    @OneToMany (type => NuestrosTrabajo, nuestrostrabajo => nuestrostrabajo.usuarioadmin )
    nuestrostrabajo: NuestrosTrabajo[];
    @OneToMany (type => Inventario, inventario => inventario.usuarioadmin)
    inventario: Inventario[];
    @OneToMany ( type => Servicio, servicio => servicio.usuarioadmin)
    servicio: Servicio;
    
    

}
