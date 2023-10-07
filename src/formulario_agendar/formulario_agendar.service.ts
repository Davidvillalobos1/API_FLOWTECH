import { Injectable } from '@nestjs/common';
import { FormularioAgendar } from './entities/formulario_agendar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormularioAgendarService {
  constructor(
    @InjectRepository(FormularioAgendar)
    private readonly FormularioAgendarRepository: Repository<FormularioAgendar>,
  ) {}
  async crearFormulario(
    FormularioAgendarData: Partial<FormularioAgendar>,
  ): Promise<FormularioAgendar> {
    try {
      const formulario = this.FormularioAgendarRepository.create(
        FormularioAgendarData,
      );
      const nuevoFormulario =
        await this.FormularioAgendarRepository.save(formulario);

      return nuevoFormulario;
    } catch (error) {
      console.error('Error al crear formulario', error);
    }
  }
}
