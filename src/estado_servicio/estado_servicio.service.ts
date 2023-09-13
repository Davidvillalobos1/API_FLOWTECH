import { Injectable } from '@nestjs/common';
import { CreateEstadoServicioDto } from './dto/create-estado_servicio.dto';
import { UpdateEstadoServicioDto } from './dto/update-estado_servicio.dto';

@Injectable()
export class EstadoServicioService {
  create(createEstadoServicioDto: CreateEstadoServicioDto) {
    return 'This action adds a new estadoServicio';
  }

  findAll() {
    return `This action returns all estadoServicio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoServicio`;
  }

  update(id: number, updateEstadoServicioDto: UpdateEstadoServicioDto) {
    return `This action updates a #${id} estadoServicio`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoServicio`;
  }
}
