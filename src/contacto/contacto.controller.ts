import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  @Post('')
  async crearContacto(@Body() createContactoDto: CreateContactoDto): Promise<any> {
    try {
      const contactoDtoInstance = plainToClass(CreateContactoDto, createContactoDto);
      const errors = await validate(contactoDtoInstance);

      if (errors.length > 0) {
        console.log('Errores de validación:', errors);
        return {
          message: 'Error de validación',
          errors,
        };
      }

      const contacto = await this.contactoService.crearContacto(contactoDtoInstance);

      return {
        message: 'Contacto creado exitosamente',
        data: contacto,
      };
    } catch (error) {
      console.error('Error al crear el contacto', error);
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: 'Error al crear el contacto', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('mensajes')
  async getMensajes(): Promise<any> {
    try {
      const mensajes = await this.contactoService.getMensajes();
      return {
        message: 'Mensajes obtenidos exitosamente',
        data: mensajes,
      };
    } catch (error) {
      console.error('Error al obtener mensajes', error);
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: 'Error al obtener mensajes', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
