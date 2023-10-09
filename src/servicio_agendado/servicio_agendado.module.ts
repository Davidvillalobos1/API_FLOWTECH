import { Module } from '@nestjs/common';
import { ServicioAgendadoController } from './servicio_agendado.controller';
import { ServicioAgendadoService } from './servicio_agendado.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioAgendado } from './entities/servicio_agendado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioAgendado])],
  controllers: [ServicioAgendadoController],
  providers: [ServicioAgendadoService],
  exports: [ServicioAgendadoService],
})
export class ServicioAgendadoModule {}
