import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoServicioService } from './estado_servicio.service';
import { CreateEstadoServicioDto } from './dto/create-estado_servicio.dto';
import { UpdateEstadoServicioDto } from './dto/update-estado_servicio.dto';

@Controller('estado-servicio')
export class EstadoServicioController {
  constructor(private readonly estadoServicioService: EstadoServicioService) {}

  @Post()
  create(@Body() createEstadoServicioDto: CreateEstadoServicioDto) {
    return this.estadoServicioService.create(createEstadoServicioDto);
  }

  @Get()
  findAll() {
    return this.estadoServicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoServicioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoServicioDto: UpdateEstadoServicioDto) {
    return this.estadoServicioService.update(+id, updateEstadoServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoServicioService.remove(+id);
  }
}
