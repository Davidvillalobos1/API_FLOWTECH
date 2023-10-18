import { Controller, Post, Body, Get, Param } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ServicioAgendadoService } from './servicio_agendado.service';
import { ServicioAgendado } from './entities/servicio_agendado.entity';
import { CreateServicioAgendadoDto } from './dto/create-servicio_agendado.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { CreateServicioAgendadoDto } from './dto/create-servicio_agendado.dto';

@Controller('servicio_agendado')
export class ServicioAgendadoController {
  constructor(
    private readonly ServicioAgendadoService: ServicioAgendadoService,
  ) {}


  @Get(':id')
    traerporId(@Param ('id')id: number) {
       return  this.ServicioAgendadoService.traerporId(id);
  }


  @Post('')
  async crearFormulario(@Body() data: CreateServicioAgendadoDto): Promise<any> {
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
}
