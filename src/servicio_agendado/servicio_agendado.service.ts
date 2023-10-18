import { Injectable } from '@nestjs/common';
import { ServicioAgendado } from './entities/servicio_agendado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicioAgendadoService {
  constructor(
    @InjectRepository(ServicioAgendado)
    private readonly ServicioAgendadoRepository: Repository<ServicioAgendado>,
  ) {}
  async crearAgenda(
    ServicioAgendadoData: Partial<ServicioAgendado>,
  ): Promise<ServicioAgendado> {
    try {
      const agenda =
        this.ServicioAgendadoRepository.create(ServicioAgendadoData);
      const nuevaAgenda = await this.ServicioAgendadoRepository.save(agenda);
      return nuevaAgenda;
    } catch (error) {
      console.error('Error al crear una agenda', error);
      throw new Error('Error');
    }
  }
}
