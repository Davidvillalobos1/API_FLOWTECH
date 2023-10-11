import { Controller, Post, Body } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ServicioAgendadoService } from './servicio_agendado.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateServicioAgendadoDto } from './dto/create-servicio_agendado.dto';

@Controller()
export class ServicioAgendadoController {
  constructor(
    private readonly ServicioAgendadoService: ServicioAgendadoService,
  ) {}

  @Post('servicio_agendado')
  async crearFormulario(
    @Body('comuna') comuna: string,
    @Body('direccion') direccion: string,
    @Body('telefono') telefono: number,
    @Body('revision_tecnica') revision_tecnica: string,
  ): Promise<any> {
    console.log('Datos recibidos: ', {
      comuna,
      direccion,
      telefono,
      revision_tecnica,
    });
    try {
      const agendado = await this.ServicioAgendadoService.crearAgenda({
        comuna,
        direccion,
        telefono,
        revision_tecnica,
      });
      console.log('agendar: ', agendado);
      return {
        message: 'Formulario creado',
        data: agendado,
      };
    } catch (error) {
      console.error('Error al crear agendado', error);
    }
  }
}
