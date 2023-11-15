import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioDto } from './dto/servicio.dto';

@Controller('servicio')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @Get()
  async findAll() {
    return await this.servicioService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.servicioService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() servicioDto: ServicioDto) {
    return await this.servicioService.create(servicioDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: number, @Body() servicioDto: ServicioDto) {
    return await this.servicioService.update(id, servicioDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.servicioService.delete(id);
  }
}
