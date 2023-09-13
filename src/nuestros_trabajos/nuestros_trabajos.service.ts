import { Injectable } from '@nestjs/common';
import { CreateNuestrosTrabajoDto } from './dto/create-nuestros_trabajo.dto';
import { UpdateNuestrosTrabajoDto } from './dto/update-nuestros_trabajo.dto';

@Injectable()
export class NuestrosTrabajosService {
  create(createNuestrosTrabajoDto: CreateNuestrosTrabajoDto) {
    return 'This action adds a new nuestrosTrabajo';
  }

  findAll() {
    return `This action returns all nuestrosTrabajos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nuestrosTrabajo`;
  }

  update(id: number, updateNuestrosTrabajoDto: UpdateNuestrosTrabajoDto) {
    return `This action updates a #${id} nuestrosTrabajo`;
  }

  remove(id: number) {
    return `This action removes a #${id} nuestrosTrabajo`;
  }
}
