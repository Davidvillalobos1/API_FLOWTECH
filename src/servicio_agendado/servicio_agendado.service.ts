import { Injectable } from '@nestjs/common';
import { ServicioAgendado } from './entities/servicio_agendado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';


@Injectable()
export class ServicioAgendadoService {

  buscarEmail(email: string): Promise<any> {
    return this.usuarioService.findOneByEmail(email);
  }
  
  

  constructor(
    @InjectRepository(ServicioAgendado)
    private readonly ServicioAgendadoRepository: Repository<ServicioAgendado>,
    private usuarioService : UsuarioService
  ) {}
  async crearAgenda(
    ServicioAgendadoData: Partial<ServicioAgendado>,
  ): Promise<ServicioAgendado> {
    try {
      // const email = await this.buscarEmail(ServicioAgendadoData.usuario.email);
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
