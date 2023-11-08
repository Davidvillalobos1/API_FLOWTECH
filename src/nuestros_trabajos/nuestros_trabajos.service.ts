import { Injectable } from '@nestjs/common';
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

  async findAll(): Promise<NuestrosTrabajo[]> {
    return await this.nuestrosTrabajoRepository.find();
  }
    
  


   async findOne(id: number) {
    return `This action returns a #${id} nuestrosTrabajo`;
  }

  async update(id: number, updateNuestrosTrabajoDto: UpdateNuestrosTrabajoDto) {
    return `This action updates a #${id} nuestrosTrabajo`;
  }

  async remove(id: number) {
    return `This action removes a #${id} nuestrosTrabajo`;
  }
}
