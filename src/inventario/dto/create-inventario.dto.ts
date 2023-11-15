import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';

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


  @MinLength(1, { message: 'El historial debe tener almenos 1 letra' })
  @IsString()
  historial_producto: string;
}
