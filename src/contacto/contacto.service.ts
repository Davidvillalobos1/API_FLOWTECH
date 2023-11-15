import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacto } from './entities/contacto.entity';
import { CreateContactoDto } from './dto/create-contacto.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactoService {
  private readonly logger = new Logger(ContactoService.name);

  constructor(
    @InjectRepository(Contacto)
    private readonly contactoRepository: Repository<Contacto>,
  ) {}

  async crearContacto(contactoData: CreateContactoDto): Promise<Contacto> {
    try {
      const contacto = this.contactoRepository.create(contactoData);
      const nuevoContacto = await this.contactoRepository.save(contacto);

      await this.enviarCorreo(contactoData)

      this.logger.log('Contacto creado exitosamente');
      return nuevoContacto;
    } catch (error) {
      this.logger.error('Error al crear el contacto', error);
      throw error;
    }
  }

  private async enviarCorreo(contactoData: CreateContactoDto): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'flowtech2023a@gmail.com',
          pass: 'svqo qhgm dgcd ynyb',
        },
        tls: {
          rejectUnauthorized: false,
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
      this.logger.log('Correo enviado exitosamente');
    } catch (error) {
      this.logger.error('Error al enviar el correo', error);
      // Puedes decidir si lanzar una excepción o simplemente registrar el error
    }
  }

  async getMensajes(): Promise<Contacto[]> {
    try {
      const mensajes = await this.contactoRepository.find();
      return mensajes;
    } catch (error) {
      this.logger.error('Error al obtener los mensajes', error);
      throw error;
    }
  }
}
