import { Injectable } from '@nestjs/common';
// import { CreateUsuarioDto } from './dto/create-usuario.dto';
// import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm'


@Injectable()
export class UsuarioService {
  findOne(arg0: { id: any; }) {
    throw new Error('Method not implemented.');
  }
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
