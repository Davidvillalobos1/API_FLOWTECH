import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Contacto } from './entities/contacto.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';


@Injectable()
export class ContactoService {
  constructor(
    @InjectRepository(Contacto)
    private readonly contactoRepository: Repository<Contacto>,
  ) {}
  async crearContacto(contactoData: Partial<Contacto>): Promise<Contacto> {
    try {
      const contacto = this.contactoRepository.create(contactoData);
      const nuevoContacto = await this.contactoRepository.save(contacto);
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'flowtech2023a@gmail.com',
          pass: 'svqo qhgm dgcd ynyb',
        },
      });

      const gmail = {
        from: 'flowtech2023a@gmail.com',
        to: 'flowtech2023a@gmail.com',
        subject: 'Servicio',
        text: `Nombre: ${contactoData.nombre_mensaje} 
        Apellido: ${contactoData.apellido_mensaje},Email: ${contactoData.email_mensaje}, Telefono: ${contactoData.telefono_mensaje} 
        . Mensaje:${contactoData.mensaje_mensaje}`,
      };

      await transporter.sendMail(gmail);
      return nuevoContacto;
    } catch (error) {
      console.error('Error al crear el contacto', error);
    }
  }

  async getMensajes(): Promise<Contacto[]> {
    try {
      const mensajes = await this.contactoRepository.find();
      return mensajes;
    } catch (error) {
      console.error('Error al obtener los mensajes', error);
      throw error;
    }
  }

}

