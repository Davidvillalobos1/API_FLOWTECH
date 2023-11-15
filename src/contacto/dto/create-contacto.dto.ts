import { IsEmail, IsNotEmpty, IsInt, IsString, MinLength } from 'class-validator';

export class CreateContactoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nombre_mensaje: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  apellido_mensaje: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email_mensaje: string;

  @IsNotEmpty()
  @IsInt()
  telefono_mensaje: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  mensaje_mensaje: string;
}
