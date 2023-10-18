import { Controller, Post, Body } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ServicioAgendadoService } from './servicio_agendado.service';
import { ServicioAgendado } from './entities/servicio_agendado.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { CreateServicioAgendadoDto } from './dto/create-servicio_agendado.dto';

@Controller()
export class ServicioAgendadoController {
  constructor(
    private readonly ServicioAgendadoService: ServicioAgendadoService,
  ) {}

  @Post('servicio_agendado')
  async crearFormulario(@Body() data: ServicioAgendado): Promise<any> {
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
