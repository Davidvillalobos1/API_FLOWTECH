import { Controller, Post, Body, Request } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ServicioAgendadoService } from './servicio_agendado.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { CreateServicioAgendadoDto } from './dto/create-servicio_agendado.dto';
import { ServicioAgendado } from './entities/servicio_agendado.entity';

@Controller()
export class ServicioAgendadoController {
  constructor(
    private readonly ServicioAgendadoService: ServicioAgendadoService,
  ) {}

  @Post('servicio_agendado')
  async crearFormulario(
    @Request() req,
    @Body() body: ServicioAgendado,
  ): Promise<any> {
    if (!req.user || !req.user.id) {
      return {
        message: 'Usuario no autenticado',
      };
    }

    const usuarioId = req.user.id;

    /**/
    const nuevoAgendado = new ServicioAgendado();
    nuevoAgendado.usuario = usuarioId;
    nuevoAgendado.comuna = body.comuna;
    nuevoAgendado.direccion = body.direccion;
    nuevoAgendado.telefono = body.telefono;
    nuevoAgendado.revision_tecnica = body.revision_tecnica;

    /**/

    try {
      const agendado =
        await this.ServicioAgendadoService.crearAgenda(nuevoAgendado);
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
