import { IsString, MinLength } from 'class-validator';

export class CreateNuestrosTrabajoDto {
  @IsString()
  @MinLength(3, { message: 'El nombre del trabajo debe tener al menos 3 caracteres' })
  nombre_trabajo: string;

  @IsString()
  @MinLength(3, { message: 'La foto del trabajo debe tener al menos 3 caracteres' })
  foto_trabajo: string;

  @IsString()
  @MinLength(3, { message: 'La descripción del trabajo debe tener al menos 3 caracteres' })
  descripcion_trabajo: string;
}
