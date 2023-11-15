import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateInventarioDto {
  @IsNotEmpty()
  @IsString()
  nombre_producto: string;

  @IsNotEmpty()
  @IsString()
  foto_producto: string;

  @IsNotEmpty()
  @IsString()
  descripcion_producto: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad_producto: number;
}
