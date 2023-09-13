import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoServicioDto } from './create-estado_servicio.dto';

export class UpdateEstadoServicioDto extends PartialType(CreateEstadoServicioDto) {}
