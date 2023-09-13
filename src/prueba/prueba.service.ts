import { Injectable } from '@nestjs/common';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { UpdatePruebaDto } from './dto/update-prueba.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prueba } from './entities/prueba.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PruebaService {
  constructor(@InjectRepository(Prueba) private pruebaRep: Repository <Prueba>) {}
  create(createPruebaDto: CreatePruebaDto) {
    const data = this.pruebaRep.save(createPruebaDto)
    return 'This action adds a new prueba';
  }

  async findAll() {
    const data = await this.pruebaRep.find()
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} prueba`;
  }

  update(id: number, updatePruebaDto: UpdatePruebaDto) {
    return `This action updates a #${id} prueba`;
  }

  remove(id: number) {
    return `This action removes a #${id} prueba`;
  }
}
