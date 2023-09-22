// src/servicio/servicio.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioDto } from 'src/servicio/dto/servicio.dto';

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
  async create(@Body() servicioDto: ServicioDto) {
    return await this.servicioService.create(servicioDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() servicioDto: ServicioDto) {
    return await this.servicioService.update(id, servicioDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.servicioService.delete(id);
  }
}
