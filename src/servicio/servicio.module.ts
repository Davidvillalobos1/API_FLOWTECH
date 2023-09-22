
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { ServicioController } from './servicio.controller';
import { ServicioService } from './servicio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio])],
  controllers: [ServicioController],
  providers: [ServicioService],
})
export class ServicioModule {}
