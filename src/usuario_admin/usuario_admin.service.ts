import { Injectable } from '@nestjs/common';
import { CreateUsuarioAdminDto } from './dto/create-usuario_admin.dto';
import { UsuarioAdmin } from './entities/usuario_admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioAdminService {
  constructor(
    @InjectRepository(UsuarioAdmin)
    private readonly usuarioAdminRepository: Repository<UsuarioAdmin>,
  ) { }

  async create(createUsuarioAdminDto: CreateUsuarioAdminDto): Promise<UsuarioAdmin> {
    const hashedPassword = await bcrypt.hash(createUsuarioAdminDto.contrasena_admin, 10);

    const usuarioAdmin = this.usuarioAdminRepository.create({
      email_admin: createUsuarioAdminDto.email_admin,
      contrasena_admin: hashedPassword,
    });

    return await this.usuarioAdminRepository.save(usuarioAdmin);
  }



  async findByEmail(email_admin: string): Promise<UsuarioAdmin | undefined> {
    return this.usuarioAdminRepository.findOne({ where: { email_admin } });
  }

  async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    if (!plainTextPassword || !hashedPassword) {
      return false;
    }

    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  findAll() {
    return `This action returns all usuarioAdmin`;
  }
}
