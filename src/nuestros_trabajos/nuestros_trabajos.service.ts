import { Injectable } from '@nestjs/common';
import { CreateNuestrosTrabajoDto } from './dto/create-nuestros_trabajo.dto';
import { UpdateNuestrosTrabajoDto } from './dto/update-nuestros_trabajo.dto';
import { NuestrosTrabajo } from './entities/nuestros_trabajo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';




@Injectable()
export class NuestrosTrabajosService {
  constructor(
    @InjectRepository(NuestrosTrabajo)
    private nuestrosTrabajoRepository: Repository<NuestrosTrabajo>,
  ) {}
  private nuestrosTrabajos: NuestrosTrabajo[] = [];

  
  async create(createNuestrosTrabajoDto: NuestrosTrabajo) {
    const trabajo = this.nuestrosTrabajoRepository.create(createNuestrosTrabajoDto);
    return await this.nuestrosTrabajoRepository.save(trabajo);
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
