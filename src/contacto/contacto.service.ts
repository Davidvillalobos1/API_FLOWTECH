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
  //Se crea un nuevo contacto
  async crearContacto(contactoData: Partial<Contacto>): Promise<Contacto> {
    try {
      //Creacion de instancia para contacto
      const contacto = this.contactoRepository.create(contactoData);
      //Guardado del contacto en nuestra base de datos.
      const nuevoContacto = await this.contactoRepository.save(contacto);

      //Se hace envio al correo de la Pyme
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
        text: `${contactoData.nombre_mensaje} 
        ${contactoData.apellido_mensaje},${contactoData.email_mensaje},${contactoData.telefono_mensaje} 
        . Email:${contactoData.mensaje_mensaje}`,
      };

      await transporter.sendMail(gmail);
      return nuevoContacto;
    } catch (error) {
      //En caso de error manda un mensaje en la consola.
      console.error('Error al crear el contacto', error);
    }
  }

  async getMensajes(): Promise<Contacto[]> {
    try {
      const mensajes = await this.contactoRepository.find(); // Esto obtiene todos los mensajes almacenados
      return mensajes;
    } catch (error) {
      console.error('Error al obtener los mensajes', error);
      throw error;
    }
  }

}

