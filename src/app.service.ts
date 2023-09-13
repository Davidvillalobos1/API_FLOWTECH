import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository (Usuario) private readonly userRepository: Repository<Usuario>
  ){
    
  }
  async create(data: any): Promise<Usuario> {
    return await this.userRepository.save(data);
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    return this.userRepository.findOne({ where: { email } });
  }
}
