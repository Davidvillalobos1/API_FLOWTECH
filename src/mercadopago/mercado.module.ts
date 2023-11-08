import {forwardRef, Module } from '@nestjs/common';
import { MercadoPagoController } from './mercadopago.controller';
import { MercadoPagoService } from './mercadopago.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { ServicioAgendadoModule } from 'src/servicio_agendado/servicio_agendado.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servicio]),
    forwardRef(() => ServicioAgendadoModule),
  ],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
  exports: [MercadoPagoService],
})
export class MercadoModule {}
