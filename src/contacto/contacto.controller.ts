import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactoService } from './contacto.service';
// import { CreateContactoDto } from './dto/create-contacto.dto';
// import { UpdateContactoDto } from './dto/update-contacto.dto';
// import { Contacto } from './entities/contacto.entity';
// import { UsuarioAdmin } from 'src/usuario_admin/entities/usuario_admin.entity';
// import { Repository } from 'typeorm';

@Controller()
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  @Post('contacto')
  async crearContacto(
    @Body('nombre_mensaje') nombre_mensaje: string,
    @Body('apellido_mensaje') apellido_mensaje: string,
    @Body('email_mensaje') email_mensaje: string,
    @Body('telefono_mensaje') telefono_mensaje: number,
    @Body('mensaje_mensaje') mensaje_mensaje: string,
  ): Promise<any> {
    try {
      //Se llama crearContacto del service para la creacion del contacto nuevo
      const contacto = await this.contactoService.crearContacto({
        nombre_mensaje,
        apellido_mensaje,
        email_mensaje,
        telefono_mensaje,
        mensaje_mensaje,
      });
      // Respuesta del json al crear el contacto
      return {
        message: 'Contacto creado exitosamente',
        data: contacto,
      };
    } catch (error) {
      //mensaje de error al crear contacto
      console.error('Error al crear el contacto', error);
    }
  }
}

// @Post()
// async crearContacto(@Body() contactoData: Contacto): Promise<Contacto> {
//   try {
//     const nuevoContacto =
//       await this.contactoService.crearContacto(contactoData);
//     return nuevoContacto;
//   } catch (error) {
//     console.error('Error al crear y guardar el contacto:', error);
//     throw error; // Lanza el error para que se maneje globalmente
//   }
// }
// @Post('') // Ruta relativa al controlador
// async crearContactoMensaje(
//   @Body()
//   body: {
//     id: number;
//     nombre_mensaje: string;
//     apellido_mensaje: string;
//     email_mensaje: string;
//     telefono_mensaje: number;
//     mensaje_mensaje: string;
//     usuarioadmin: any[];
//     usuario: any[];
//   },
// ) {
//   const {
//     id,
//     nombre_mensaje,
//     apellido_mensaje,
//     email_mensaje,
//     telefono_mensaje,
//     mensaje_mensaje,
//     usuarioadmin,
//     usuario,
//   } = body;

//   const contacto = await this.contactoService.crearContactoMensaje({
//     id,
//     nombre_mensaje,
//     apellido_mensaje,
//     email_mensaje,
//     telefono_mensaje,
//     mensaje_mensaje,
//     usuarioadmin,
//     usuario,
//   });

//   return {
//     message: 'Mensaje enviado',
//     token: contacto,
//   };

//   @Get()
//   findAll() {
//     return this.contactoService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.contactoService.findOne(+id);
//   }

//   @Patch(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateContactoDto: UpdateContactoDto,
//   ) {
//     return this.contactoService.update(+id, updateContactoDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.contactoService.remove(+id);
//   }
// }
