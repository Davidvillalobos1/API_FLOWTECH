import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { ServicioAgendadoService } from './servicio_agendado.service';
import { ServicioAgendado } from './entities/servicio_agendado.entity';
import { CreateServicioAgendadoDto } from './dto/create-servicio_agendado.dto';
import { Response } from 'express';
import { MercadoPagoService } from 'src/mercadopago/mercadopago.service';

@Controller('pagos')
export class PagosController {
  constructor(private readonly servicioAgendadoService: ServicioAgendadoService) {}

  @Post('confirmar-pago')
  async confirmarPago(@Body() data: any) {
    if (data.pagoExitoso) {
      // Crea un servicio agendado con los datos proporcionados
      const nuevoAgendado = await this.servicioAgendadoService.crearAgenda(data);
      
      // Devuelve una respuesta apropiada al frontend
      return { mensaje: 'Pago confirmado y servicio agendado', agendado: nuevoAgendado };
    }
  }
}

@Controller('servicio_agendado')
export class ServicioAgendadoController {
  constructor(
    private readonly ServicioAgendadoService: ServicioAgendadoService,
  ) { }


  @Get(':id')
  traerporId(@Param('id') id: number) {
    return this.ServicioAgendadoService.traerporId(id);
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
  async crearFormulario(
    @Body() data: CreateServicioAgendadoDto,
  ): Promise<any> {
    const agendado = await this.ServicioAgendadoService.crearAgenda(data);

    try {
      return {
        message: 'Formulario creado',
        data: agendado,
      };
    } catch (error) {
      console.error('Error al crear agendado', error);
    }
  }

  @Post('agendar-y-pagar')
  async agendarYPagar(@Body() data: CreateServicioAgendadoDto, @Res() res: Response): Promise<any> {
    // Crea la preferencia de pago en MercadoPago y obtén la URL de pago
    const servicioId = data.servicioId;

    // Redirige al usuario a la URL de MercadoPago
    res.redirect(`https://api.mercadopago.com/checkout/preferences?access_token=TEST-3284379278811046-101115-7c09ad700aea3d7e90fbab6658cadd26-331616373?servicioId=${servicioId}`);
  }

  @Post('pago-exitoso')
  async pagoExitoso(@Body() data: any): Promise<any> {
    try {
      // Verifica que el pago sea exitoso y obtén la información del servicio
      const servicioId = data.servicioId;

      // Aquí puedes realizar más validaciones y procesar el pago si es necesario

      // Crea el registro del servicio agendado
      const agendado = await this.ServicioAgendadoService.crearAgenda(data);

      return {
        message: 'Pago exitoso y formulario creado',
        data: agendado,
      };
    } catch (error) {
      console.error('Error al procesar el pago exitoso', error);
    }
  }
  



  


}
