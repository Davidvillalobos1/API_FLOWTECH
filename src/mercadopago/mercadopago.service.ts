import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FindOneOptions, Repository } from 'typeorm';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioDto } from 'src/servicio/dto/servicio.dto';

@Injectable()
export class MercadoPagoService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  async obtenerPrecioServicio(servicioDto: ServicioDto): Promise<{ nombre: string; precio: number; imagen: string }> {
    const { nombre_servicio, foto_servicio } = servicioDto;
    console.log
    try {
      const options: FindOneOptions<Servicio> = {
        where: { nombre_servicio, foto_servicio },
        select: ['nombre_servicio', 'precio_servicio', 'foto_servicio'],
      };
      const servicio = await this.servicioRepository.findOne(options);
      if (servicio) {
        return {
          nombre: servicio.nombre_servicio,
          precio: servicio.precio_servicio,
          imagen: servicio.foto_servicio, 
        };
      } else {
        throw new Error('No se encontró el servicio');
      }
    } catch (error) {
      console.error('Error al obtener los datos del servicio: ', error);
      throw new Error('Error');
    }
  }

  async crearPreferenciaPago(servicioId: number ): Promise<string> {
   
    const servicio = await this.servicioRepository.findOne({where: {id: servicioId}})
    const mercadoPagoUrl =
      'https://api.mercadopago.com/checkout/preferences?access_token=TEST-3284379278811046-101115-7c09ad700aea3d7e90fbab6658cadd26-331616373';
    const preference = {
      items: [
        {
          title: servicio.nombre_servicio,
          unit_price: servicio.precio_servicio,
          quantity: 1,
          picture_url: servicio.foto_servicio,
        },
      ],
      auto_return: 'approved',
      back_urls: {
        success: 'https://flowtechh.netlify.app/success',
        failure: 'https://flowtechh.netlify.app/servicios',
        pending: 'https://flowtechh.netlify.app',
      },
    };

    try {
      const response = await axios.post(mercadoPagoUrl, preference, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        return response.data.init_point;
      } else {
        console.log(response);
        throw new Error('Error al crear la preferencia de pago');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error al conectar con Mercado Pago');
    }
  }
}
