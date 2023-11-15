import { IsString, IsEmail, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateServicioAgendadoDto {
  @IsNotEmpty()
  @IsString()
  comuna: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  revision_tecnica: string;

  @IsNotEmpty()
  @IsNumber()
  servicioId: number;

  @IsNotEmpty()
  @IsNumber()
  telefono: number;

  @IsNotEmpty()
  estado_servicio: string;
}
