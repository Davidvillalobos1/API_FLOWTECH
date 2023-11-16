// servicio.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { ServicioDto } from 'src/servicio/dto/servicio.dto';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  async findAll(): Promise<Servicio[]> {
    return await this.servicioRepository.find();
  }

  async findById(id: number): Promise<Servicio | undefined> {
    return await this.servicioRepository.findOne({ where: { id } });
  }

  async create(servicioDto: ServicioDto): Promise<Servicio> {
    try {
      const servicio = this.servicioRepository.create(servicioDto);
      return await this.servicioRepository.save(servicio);
    } catch (error) {
      console.error(error.message);
      this.handleException('Error al crear el servicio');
    }
  }

  async update(id: number, servicioDto: ServicioDto): Promise<Servicio> {
    await this.servicioRepository.update(id, servicioDto);
    return await this.servicioRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.servicioRepository.delete(id);
  }

  private handleException(message: string): never {
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
