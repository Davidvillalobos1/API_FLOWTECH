import { Module } from '@nestjs/common';
import { EstadoServicioService } from './estado_servicio.service';
import { EstadoServicioController } from './estado_servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoServicio } from './entities/estado_servicio.entity';

@Module({
  imports:[TypeOrmModule.forFeature ([EstadoServicio])],
  controllers: [EstadoServicioController],
  providers: [EstadoServicioService],
})
export class EstadoServicioModule {}
