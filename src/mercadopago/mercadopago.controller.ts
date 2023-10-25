import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express'; // Asegúrate de que esta importación sea correcta
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('crear-preferencia')
  async crearPreferenciaPago(@Body() data: any, @Res() res: Response): Promise<any> {
    try {
      const precioServicio = await this.mercadoPagoService.obtenerPrecioServicio(data.servicioId);

      // Llama al servicio de Mercado Pago para crear la preferencia
      const initPoint = await this.mercadoPagoService.crearPreferenciaPago(precioServicio);

      // Redirige al usuario al sitio de pago de Mercado Pago
      res.redirect(initPoint);
    } catch (error) {
      console.error('Error al crear la preferencia de pago en Mercado Pago: ', error);
      throw new Error('Error');
    }
  }
}
