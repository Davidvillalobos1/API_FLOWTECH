import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioAdminDto } from './create-usuario_admin.dto';

export class UpdateUsuarioAdminDto extends PartialType(CreateUsuarioAdminDto) {}
