import { Controller, Post, Body} from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('crear-preferencia')
  async crearPreferenciaPago(@Body() data: any): Promise<any> {
    try {
      const { servicioId } = data;

      const initPoint = await this.mercadoPagoService.crearPreferenciaPago(servicioId);
      
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
