import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateInventarioDto {
  @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío' })
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto' })
  nombre_producto: string;

  @IsNotEmpty({ message: 'La foto del producto no puede estar vacía' })
  @IsString({ message: 'La foto del producto debe ser una cadena de texto' })
  foto_producto: string;

  @IsNotEmpty({ message: 'La descripción del producto no puede estar vacía' })
  @IsString({ message: 'La descripción del producto debe ser una cadena de texto' })
  descripcion_producto: string;

  @IsNotEmpty({ message: 'La cantidad del producto no puede estar vacía' })
  @IsNumber({}, { message: 'La cantidad del producto debe ser un número' })
  cantidad_producto: number;

  @IsNotEmpty({ message: 'El historial del producto no puede estar vacío' })
  @IsString({ message: 'El historial del producto debe ser una cadena de texto' })
  historial_producto: string;
}
