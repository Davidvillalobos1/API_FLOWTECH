import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UpdateNuestrosTrabajoDto } from './dto/update-nuestros_trabajo.dto';
import { NuestrosTrabajo } from './entities/nuestros_trabajo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateNuestrosTrabajoDto } from './dto/create-nuestros_trabajo.dto';
import { validate } from 'class-validator';

@Injectable()
export class NuestrosTrabajosService {
  constructor(
    @InjectRepository(NuestrosTrabajo)
    private nuestrosTrabajoRepository: Repository<NuestrosTrabajo>,
  ) {}

  async create(createNuestrosTrabajoDto: CreateNuestrosTrabajoDto): Promise<NuestrosTrabajo> {
    try {
      const errors = await validate(createNuestrosTrabajoDto);
      if (errors.length > 0) {
        const validationErrorMessages = errors.map(error => Object.values(error.constraints)).join(', ');
        throw new HttpException(validationErrorMessages, HttpStatus.BAD_REQUEST); //actualizar//
      }

      const trabajo = this.nuestrosTrabajoRepository.create(createNuestrosTrabajoDto);
      return await this.nuestrosTrabajoRepository.save(trabajo);
    } catch (error) {
      console.error('Error al crear el trabajo', error);
      this.handleException('Error al crear el trabajo', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<NuestrosTrabajo[]> {
    try {
      return await this.nuestrosTrabajoRepository.find();
    } catch (error) {
      console.error('Error al obtener los trabajos', error);
      this.handleException('Error al obtener los trabajos', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number): Promise<NuestrosTrabajo> {
    try {
      const options: FindOneOptions<NuestrosTrabajo> = {
        where: { id },
      };

      const trabajo = await this.nuestrosTrabajoRepository.findOne(options);

      if (!trabajo) {
        this.handleException(`Nuestro trabajo con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
      }

      return trabajo;
    } catch (error) {
      console.error(`Error al obtener el trabajo con ID ${id}`, error);
      this.handleException(`Error al obtener el trabajo con ID ${id}`, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.nuestrosTrabajoRepository.delete(id);

      if (result.affected === 0) {
        this.handleException(`Nuestro trabajo con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error(`Error al eliminar el trabajo con ID ${id}`, error);
      this.handleException(`Error al eliminar el trabajo con ID ${id}`, HttpStatus.BAD_REQUEST);
    }
  }

  private handleException(message: string, status: HttpStatus): never {
    throw new HttpException(message, status);
  }
}
