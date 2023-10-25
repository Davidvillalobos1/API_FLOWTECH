import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MercadoPagoService {
  constructor() {}

  async obtenerPrecioServicio(servicioId: number): Promise<number> {
    // Aquí, realiza la lógica necesaria para obtener el precio del servicio
    // Utiliza el servicioId para buscar el precio en tu base de datos o donde lo tengas almacenado
    // Retorna el precio del servicio
    // Ejemplo:
    const precio = 100; // Supongamos que obtienes el precio del servicio de alguna fuente de datos
    return precio;
  }

  async crearPreferenciaPago(precio: number): Promise<string> {
    // Aquí, realiza la llamada a la API de Mercado Pago para crear la preferencia de pago
    const mercadoPagoUrl = 'https://api.mercadopago.com/checkout/preferences';
    const preference = {
      items: [
        {
          title: 'Producto',
          unit_price: precio,
          quantity: 1,
        },
      ],
      auto_return: 'approved',
      back_urls: {
        success: 'https://netlify--flowtechh.netlify.app/perfil',
        failure: 'https://netlify--flowtechh.netlify.app/servicios',
        pending: 'https://netlify--flowtechh.netlify.app',
      },
    };

    try {
      const response = await axios.post(mercadoPagoUrl, preference, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer TEST-3284379278811046-101115-7c09ad700aea3d7e90fbab6658cadd26-331616373', // Reemplaza con tu token de Mercado Pago
        },
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

