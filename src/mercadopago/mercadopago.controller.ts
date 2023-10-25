import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('crear-preferencia')
  async crearPreferenciaPago(@Body() data: any): Promise<any> {
    try {
      const { servicioId } = data;
      const servicioInfo = await this.mercadoPagoService.obtenerPrecioServicio(servicioId);

   
      const initPoint = await this.mercadoPagoService.crearPreferenciaPago(servicioInfo);

      console.log('Link de Mercado Pago:', initPoint); 

      return {
        initPoint,
      };
    } catch (error) {
      console.error('Error al crear la preferencia de pago en Mercado Pago: ', error);
      throw new Error('Error');
    }
  }
}
