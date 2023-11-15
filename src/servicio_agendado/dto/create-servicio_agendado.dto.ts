import { IsString, IsEmail, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateServicioAgendadoDto {
  @IsNotEmpty()
  comuna: string;

  @IsNotEmpty()
  direccion: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  revision_tecnica: string;

  @IsNotEmpty()
  servicioId: number;

  @IsNotEmpty()
  telefono: number;

  estado_servicio: string;
}
