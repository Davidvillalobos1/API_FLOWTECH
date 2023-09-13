import { Module } from '@nestjs/common';
import { NuestrosTrabajosService } from './nuestros_trabajos.service';
import { NuestrosTrabajosController } from './nuestros_trabajos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NuestrosTrabajo } from './entities/nuestros_trabajo.entity';


@Module({
  imports:[TypeOrmModule.forFeature ([NuestrosTrabajo])],
  controllers: [NuestrosTrabajosController],
  providers: [NuestrosTrabajosService],
})
export class NuestrosTrabajosModule {}
