import { Injectable } from '@nestjs/common';
// import { CreateContactoDto } from './dto/create-contacto.dto';
// import { UpdateContactoDto } from './dto/update-contacto.dto';
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
}

// constructor(
//   @InjectRepository(Contacto)
//   private readonly contactoRepository: Repository<Contacto>,
// ) {}

// async crearContacto(contactoData: Partial<Contacto>): Promise<Contacto> {
//   try {
//     const contacto = this.contactoRepository.create(contactoData);
//     const nuevoContacto = await this.contactoRepository.save(contacto);
//     return nuevoContacto;
//   } catch (error) {
//     console.error('Error al crear y guardar el contacto:', error);
//     throw error; // Lanza el error para que se maneje globalmente
//   }
// }

// create(createContactoDto: CreateContactoDto) {
//   return 'This action adds a new contacto';
// }
// findAll() {
//   return `This action returns all contacto`;
// }

// findOne(id: number) {
//   return `This action returns a #${id} contacto`;
// }

// update(id: number, updateContactoDto: UpdateContactoDto) {
//   return `This action updates a #${id} contacto`;
// }

// remove(id: number) {
//   return `This action removes a #${id} contacto`;
// }
