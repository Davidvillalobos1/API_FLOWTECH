import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { UsuarioAdmin } from "src/usuario_admin/entities/usuario_admin.entity"
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm"

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío' })
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto' })
  @Column()
  nombre_producto: string;

  @IsNotEmpty({ message: 'La foto del producto no puede estar vacía' })
  @IsString({ message: 'La foto del producto debe ser una cadena de texto' })
  @Column()
  foto_producto: string;

  @IsNotEmpty({ message: 'La descripción del producto no puede estar vacía' })
  @IsString({ message: 'La descripción del producto debe ser una cadena de texto' })
  @Column()
  descripcion_producto: string;

  @IsNotEmpty({ message: 'La cantidad del producto no puede estar vacía' })
  @IsNumber({}, { message: 'La cantidad del producto debe ser un número' })
  @Column()
  cantidad_producto: number;

  @IsNotEmpty({ message: 'El historial del producto no puede estar vacío' })
  @IsString({ message: 'El historial del producto debe ser una cadena de texto' })
  @Column()
  historial_producto: string;

  @ManyToOne(type => UsuarioAdmin, usuarioadmin => usuarioadmin.inventario)
  usuarioadmin: UsuarioAdmin;
}
