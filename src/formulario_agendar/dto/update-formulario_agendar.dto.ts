import { PartialType } from '@nestjs/mapped-types';
import { CreateFormularioAgendarDto } from './create-formulario_agendar.dto';

export class UpdateFormularioAgendarDto extends PartialType(
  CreateFormularioAgendarDto,
) {}
