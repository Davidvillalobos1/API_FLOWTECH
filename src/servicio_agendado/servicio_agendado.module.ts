import { Module } from '@nestjs/common';
import { ServicioAgendadoController } from './servicio_agendado.controller';
import { ServicioAgendadoService } from './servicio_agendado.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioAgendado } from './entities/servicio_agendado.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioAgendado, Usuario, Servicio]), UsuarioModule],
  controllers: [ServicioAgendadoController],
  providers: [ServicioAgendadoService],
  exports: [ServicioAgendadoService],
})
export class ServicioAgendadoModule {}
