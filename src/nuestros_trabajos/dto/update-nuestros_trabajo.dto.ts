import { PartialType } from '@nestjs/mapped-types';
import { CreateNuestrosTrabajoDto } from './create-nuestros_trabajo.dto';

export class UpdateNuestrosTrabajoDto extends PartialType(CreateNuestrosTrabajoDto) {}
