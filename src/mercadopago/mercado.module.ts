import { Module } from '@nestjs/common';
import { MercadoPagoController } from './mercadopago.controller';
import { MercadoPagoService } from './mercadopago.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from 'src/servicio/entities/servicio.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ Servicio])],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
  exports: [MercadoPagoService],
})
export class MercadoModule {}
