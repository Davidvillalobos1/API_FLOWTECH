import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { UsuarioAdmin } from "src/usuario_admin/entities/usuario_admin.entity"
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm"

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  nombre_producto: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  foto_producto: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  descripcion_producto: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  cantidad_producto: number;

  @ManyToOne(type => UsuarioAdmin, usuarioadmin => usuarioadmin.inventario)
  usuarioadmin: UsuarioAdmin;
}
