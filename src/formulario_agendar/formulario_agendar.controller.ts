import { Controller, Post, Body } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormularioAgendarService } from './formulario_agendar.service';

@Controller()
export class FormularioAgendarController {
  constructor(
    private readonly FormularioAgendarService: FormularioAgendarService,
  ) {}

  @Post('agendar')
  async crearFormulario(
    @Body('comuna') comuna: string,
    @Body('direccion') direccion: string,
    @Body('telefono') telefono: number,
    @Body('revision_tecnica') revision_tecnica: string,
  ): Promise<any> {
    try {
      const agendado = await this.FormularioAgendarService.crearFormulario({
        comuna,
        direccion,
        telefono,
        revision_tecnica,
      });
      return {
        message: 'Formulario creado',
        data: agendado,
      };
    } catch (error) {
      console.error('Error al crear agendado', error);
    }
  }
}
