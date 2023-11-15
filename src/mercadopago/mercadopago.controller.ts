import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('crear-preferencia')
  async crearPreferenciaPago(@Body() data: any): Promise<any> {
    const { servicioId } = data;

    try {
      const initPoint = await this.mercadoPagoService.crearPreferenciaPago(servicioId);

      console.log('Link de Mercado Pago:', initPoint);

      return {
        initPoint,
      };
    } catch (error) {
      console.error('Error al crear la preferencia de pago en Mercado Pago: ', error);

      return new HttpException('Error al crear la preferencia de pago en Mercado Pago', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
