import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly userRepository: Repository<Usuario>,
  ) {}

  async create(data: any): Promise<Usuario> {
    if (data.nombre.length < 3) {
      throw new BadRequestException('El nombre debe tener al menos 3 caracteres');
    }

    return await this.userRepository.save(data);
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    return this.userRepository.findOne({ where: { email } });
  }
}
