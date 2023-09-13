import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NuestrosTrabajosService } from './nuestros_trabajos.service';
import { CreateNuestrosTrabajoDto } from './dto/create-nuestros_trabajo.dto';
import { UpdateNuestrosTrabajoDto } from './dto/update-nuestros_trabajo.dto';

@Controller('nuestros-trabajos')
export class NuestrosTrabajosController {
  constructor(private readonly nuestrosTrabajosService: NuestrosTrabajosService) {}

  @Post()
  create(@Body() createNuestrosTrabajoDto: CreateNuestrosTrabajoDto) {
    return this.nuestrosTrabajosService.create(createNuestrosTrabajoDto);
  }

  @Get()
  findAll() {
    return this.nuestrosTrabajosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nuestrosTrabajosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNuestrosTrabajoDto: UpdateNuestrosTrabajoDto) {
    return this.nuestrosTrabajosService.update(+id, updateNuestrosTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nuestrosTrabajosService.remove(+id);
  }
}
