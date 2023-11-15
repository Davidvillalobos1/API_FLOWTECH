import { IsString, IsEmail, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateServicioAgendadoDto {
  comuna: string;

  direccion: string;

  email: string;

  revision_tecnica: string;

  servicioId: number;

  telefono: number;

  estado_servicio: string;
}
