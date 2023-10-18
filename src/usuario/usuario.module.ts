import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[TypeOrmModule.forFeature ([Usuario]), JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' },
  })],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
