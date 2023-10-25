import { Controller, Post, Body } from '@nestjs/common';
import { MercadoPagoService } from 'src/mercadopago/mercadopago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('crear-preferencia')
  async crearPreferenciaPago(@Body() data: any): Promise<any> {
    try {
      const precioServicio = await this.mercadoPagoService.obtenerPrecioServicio(data.servicioId);

      // Llama al servicio de Mercado Pago para crear la preferencia
      const initPoint = await this.mercadoPagoService.crearPreferenciaPago(precioServicio);

      return {
        initPoint,
      };
    } catch (error) {
      console.error('Error al crear la preferencia de pago en Mercado Pago: ', error);
      throw new Error('Error');
    }
  }
}
