import { Module } from '@nestjs/common';
import { FormularioAgendarController } from './formulario_agendar.controller';
import { FormularioAgendarService } from './formulario_agendar.service';

@Module({
  controllers: [FormularioAgendarController],
  providers: [FormularioAgendarService],
})
export class FormularioAgendarModule {}
