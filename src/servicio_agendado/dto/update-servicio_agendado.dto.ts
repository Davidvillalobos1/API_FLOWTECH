import { PartialType } from '@nestjs/mapped-types';
import { CreateServicioAgendadoDto } from './create-servicio_agendado.dto';

export class UpdateServicioAgendadoDto extends PartialType(
  CreateServicioAgendadoDto,
){}