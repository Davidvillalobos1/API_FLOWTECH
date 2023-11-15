import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { NuestrosTrabajosService } from './nuestros_trabajos.service';
import { UpdateNuestrosTrabajoDto } from './dto/update-nuestros_trabajo.dto';
import { NuestrosTrabajo } from './entities/nuestros_trabajo.entity';
import { CreateNuestrosTrabajoDto } from './dto/create-nuestros_trabajo.dto';

@Controller('nuestros-trabajos')
export class NuestrosTrabajosController {
  constructor(private readonly nuestrosTrabajosService: NuestrosTrabajosService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createNuestrosTrabajoDto: CreateNuestrosTrabajoDto): Promise<any> {
    try {
      const trabajo = await this.nuestrosTrabajosService.create(createNuestrosTrabajoDto);
      return {
        message: 'Trabajo creado exitosamente',
        data: trabajo,
      };
    } catch (error) {
      console.error('Error al crear el trabajo', error);
      throw new HttpException('Error al crear el trabajo', HttpStatus.BAD_REQUEST);
    }
  }


  @Get()
  async findAll(): Promise<any> {
    try {
      const trabajos = await this.nuestrosTrabajosService.findAll();
      return {
        message: 'Trabajos obtenidos exitosamente',
        data: trabajos,
      };
    } catch (error) {
      console.error('Error al obtener trabajos', error);
      return new HttpException('Error al obtener trabajos', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    try {
      const trabajo = await this.nuestrosTrabajosService.findOne(+id);
      return {
        message: 'Trabajo obtenido exitosamente',
        data: trabajo,
      };
    } catch (error) {
      console.error('Error al obtener el trabajo', error);
      return new HttpException('Error al obtener el trabajo', HttpStatus.BAD_REQUEST);
    }
  }



  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    try {
      await this.nuestrosTrabajosService.remove(+id);
      return {
        message: 'Trabajo eliminado exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar el trabajo', error);
      return new HttpException('Error al eliminar el trabajo', HttpStatus.BAD_REQUEST);
    }
  }
}
