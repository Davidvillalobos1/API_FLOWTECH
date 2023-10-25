import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class MercadoPagoService {
  constructor() {
  }

  async createPreference(precio: number): Promise<string> {

    const mercadoPagoUrl = `https://api.mercadopago.com/checkout/preferences?access_token=TEST-3284379278811046-101115-7c09ad700aea3d7e90fbab6658cadd26-331616373`
    const preference = {
      items: [
        {
          title: 'Producto',
          unit_price: precio,
          quantity: 1,
        },
      ],
      auto_return: "approved",
      back_urls: {
        "success": "https://url_del_front/",
        "failure": "https://url_del_front/",
        "pending": "https://url_del_front/"
      }
    };
    try {
      const response = await axios.post(mercadoPagoUrl, preference, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        return response.data.init_point;
      } else {
        throw new Error('Error al crear la preferencia de pago');
      }
    } catch (error) {
      
      throw new Error('Error al conectar con Mercado Pago');
    }
  }
}
