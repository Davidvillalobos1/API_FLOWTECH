import { Injectable } from '@nestjs/common';
import { ServicioAgendado } from './entities/servicio_agendado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { CreateServicioAgendadoDto } from './dto/create-servicio_agendado.dto';


@Injectable()
export class ServicioAgendadoService {
  constructor(
    @InjectRepository(ServicioAgendado)
    private readonly ServicioAgendadoRepository: Repository<ServicioAgendado>,

    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    

  ) {}


  async traerPorCorreoUsuario(email: string): Promise<ServicioAgendado[]> {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { email } });
      const agendas = await this.ServicioAgendadoRepository.find({ where: { usuario } });
      return agendas;
    } catch (error) {
      console.error('Error al traer los servicios agendados por correo de usuario', error);
      throw new Error('Error');
    }
  }

  async traerTodos(): Promise<ServicioAgendado[]> {
    try {
      const agendas = await this.ServicioAgendadoRepository.find();
      return agendas;
    } catch (error) {
      console.error('Error al traer todos los agendas', error);
      throw new Error('Error');
    }
  }

  async traerporId(id: number): Promise<ServicioAgendado> {
    try {
      const agenda = await this.ServicioAgendadoRepository.findOne({where: {id: id}});
      return agenda;
    } catch (error) {
      console.error('Error al traer una agenda', error);
      throw new Error('Error');
    }
  }

  async crearAgenda(ServicioAgendadoData: CreateServicioAgendadoDto): Promise<ServicioAgendado> {
    try {
      console.log(ServicioAgendadoData);
      const usuario = await this.usuarioRepository.findOne({ where: { email: ServicioAgendadoData.email } });
      const servicio = await this.servicioRepository.findOne({ where: { id: ServicioAgendadoData.servicioId } }); // Utiliza el servicioId proporcionado en lugar de ServicioAgendadoData.servicio
      const agenda = this.ServicioAgendadoRepository.create({
        comuna: ServicioAgendadoData.comuna,
        direccion: ServicioAgendadoData.direccion,
        telefono: ServicioAgendadoData.telefono,
        revision_tecnica: ServicioAgendadoData.revision_tecnica,
        servicio: servicio,
        usuario: usuario,
      });
      const nuevaAgenda = await this.ServicioAgendadoRepository.save(agenda);
      return nuevaAgenda;
    } catch (error) {
      console.error('Error al crear una agenda', error);
      throw new Error('Error');
    }
  }
}

