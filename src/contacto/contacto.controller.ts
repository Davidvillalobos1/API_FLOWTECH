import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactoService } from './contacto.service';

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
      const contacto = await this.contactoService.crearContacto({
        nombre_mensaje,
        apellido_mensaje,
        email_mensaje,
        telefono_mensaje,
        mensaje_mensaje,
      });

      return {
        message: 'Contacto creado exitosamente',
        data: contacto,
      };
    } catch (error) {
      console.error('Error al crear el contacto', error);
    }
  }

  @Get('mensajes')
  async getMensajes(): Promise<any> {
    try {
      const mensajes = await this.contactoService.getMensajes(); // Asegúrate de implementar este método en tu servicio
      return {
        message: 'Mensajes obtenidos exitosamente',
        data: mensajes,
      };
    } catch (error) {
      console.error('Error al obtener mensajes', error);
    }
  }
}
