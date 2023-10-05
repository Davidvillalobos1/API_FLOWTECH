import { Injectable } from '@nestjs/common';
import { CreateNuestrosTrabajoDto } from './dto/create-nuestros_trabajo.dto';
import { UpdateNuestrosTrabajoDto } from './dto/update-nuestros_trabajo.dto';
import { NuestrosTrabajo } from './entities/nuestros_trabajo.entity';




@Injectable()
export class NuestrosTrabajosService {
  private nuestrosTrabajos: NuestrosTrabajo[] = [];

  
  create(createNuestrosTrabajoDto: NuestrosTrabajo) {
    this.nuestrosTrabajos.push(createNuestrosTrabajoDto);
    return createNuestrosTrabajoDto;
  }

  findAll() {
    return this.nuestrosTrabajos;
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
