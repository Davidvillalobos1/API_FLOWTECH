import { IsString, IsNotEmpty, IsNumber, MinLength, Min, IsUrl } from 'class-validator';

export class ServicioDto {
  @IsString({ message: 'El nombre del servicio debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del servicio no puede estar vacío' })
  nombre_servicio: string;

  @IsString({ message: 'La descripción del servicio debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción del servicio no puede estar vacía' })
  descripcion_servicio: string;

  @IsString({ message: 'La foto es necesaria' })
  @IsNotEmpty({ message: 'La foto del servicio no puede estar vacía' })
  foto_servicio: string;

  @IsNumber({}, { message: 'El precio del servicio debe ser un número' })
  @Min(0, { message: 'El precio del servicio no puede ser negativo' })
  precio_servicio: number;
}
