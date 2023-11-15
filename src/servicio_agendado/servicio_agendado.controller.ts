import { Controller, Post, Body, Get, Param, Res, Put, HttpStatus } from '@nestjs/common';
import { ServicioAgendadoService } from './servicio_agendado.service';
import { ServicioAgendado } from './entities/servicio_agendado.entity';
import { CreateServicioAgendadoDto } from './dto/create-servicio_agendado.dto';
import { Response } from 'express';

@Controller('pagos')
export class PagosController {
  constructor(private readonly servicioAgendadoService: ServicioAgendadoService) {}

  @Post('confirmar-pago')
  async confirmarPago(@Body() data: any) {
    if (data.pagoExitoso) {
      try {
        const nuevoAgendado = await this.servicioAgendadoService.crearAgenda(data);
        return { mensaje: 'Pago confirmado y servicio agendado', agendado: nuevoAgendado };
      } catch (error) {
        console.error('Error al confirmar el pago y agendar el servicio', error);
        return { mensaje: 'Error al confirmar el pago y agendar el servicio', error: error.message };
      }
    }
  }
}

@Controller('servicio_agendado')
export class ServicioAgendadoController {
  constructor(private readonly ServicioAgendadoService: ServicioAgendadoService) {}

  @Get(':id')
  async traerporId(@Param('id') id: number) {
    try {
      const result = await this.ServicioAgendadoService.traerporId(id);
      return result;
    } catch (error) {
      console.error('Error al obtener la agenda por ID', error);
      return { mensaje: 'Error al obtener la agenda por ID', error: error.message };
    }
  }

  @Get('')
  traerTodos(): Promise<ServicioAgendado[]> {
    return this.ServicioAgendadoService.traerTodos();
  }



  @Get('usuario/:email')
  traerPorCorreoUsuario(@Param('email') email: string): Promise<ServicioAgendado[]> {
    return this.ServicioAgendadoService.traerPorCorreoUsuario(email);
  }

  @Post('')
  async crearFormulario(@Body() data: CreateServicioAgendadoDto): Promise<any> {
    try {
      const agendado = await this.ServicioAgendadoService.crearAgenda(data);
      return { message: 'Formulario creado', data: agendado };
    } catch (error) {
      console.error('Error al crear el formulario', error);
      return { message: 'Error al crear el formulario', error: error.message };
    }
  }

  @Post('agendar-y-pagar')
  async agendarYPagar(@Body() data: CreateServicioAgendadoDto, @Res() res: Response): Promise<any> {
    try {
      const servicioId = data.servicioId;
      res.redirect(`https://api.mercadopago.com/checkout/preferences?access_token=TEST-3284379278811046-101115-7c09ad700aea3d7e90fbab6658cadd26-331616373?servicioId=${servicioId}`);
    } catch (error) {
      console.error('Error al redirigir para pagar', error);
      return { message: 'Error al redirigir para pagar', error: error.message };
    }
  }

  @Post('pago-exitoso')
  async pagoExitoso(@Body() data: any): Promise<any> {
    try {
      const servicioId = data.servicioId;
      const agendado = await this.ServicioAgendadoService.crearAgenda(data);
      return { message: 'Pago exitoso y formulario creado', data: agendado };
    } catch (error) {
      console.error('Error al procesar el pago exitoso', error);
      return { message: 'Error al procesar el pago exitoso', error: error.message };
    }
  }

  @Put('modificar-estado/:id')
  async modificarEstadoServicio(@Param('id') id: number): Promise<any> {
    try {
      const agendaActualizada = await this.ServicioAgendadoService.modificarEstadoServicio(id);
      return { message: 'Estado del servicio modificado correctamente', agenda: agendaActualizada };
    } catch (error) {
      console.error('Error al modificar el estado del servicio', error);
      return { message: 'Error al modificar el estado del servicio', error: error.message };
    }
  }

  @Post('enviar-correo')
  async enviarCorreo(@Body() data: any): Promise<any> {
    try {
      await this.ServicioAgendadoService.enviarCorreo(data.destinatario, data.asunto, data.cuerpo);
      return { mensaje: 'Correo electrónico enviado con éxito' };
    } catch (error) {
      console.error('Error al enviar el correo electrónico', error);
      return { mensaje: 'Error al enviar el correo electrónico', error: error.message };
    }
  }
}
