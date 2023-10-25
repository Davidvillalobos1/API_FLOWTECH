import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { ServicioAgendadoService } from './servicio_agendado.service';
import { ServicioAgendado } from './entities/servicio_agendado.entity';
import { CreateServicioAgendadoDto } from './dto/create-servicio_agendado.dto';
import { Response } from 'express';
import { MercadoPagoService } from 'src/mercadopago/mercadopago.service';

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
  
    const agendado = await this.ServicioAgendadoService.crearAgenda(data);


    const servicioId = data.servicioId;

 
    res.redirect(`http://localhost:3000//mercado-pago/crear-preferencia?servicioId=${servicioId}`);
  }




}
