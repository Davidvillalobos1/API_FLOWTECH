import { Controller, Get, Post, Body, Param, Delete, Put, ValidationPipe } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Inventario } from 'src/inventario/entities/inventario.entity';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post('agregar-producto')
  async agregarProducto(@Body() inventarioData: Inventario) {
    return this.inventarioService.agregarProducto(inventarioData);
  }

  @Get()
  async findAll() {
    const productos = await this.inventarioService.obtenerProductos();
    return { data: productos };
  }

  @Post()
  create(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventarioService.create(createInventarioDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateInventarioDto: UpdateInventarioDto) {
    return this.inventarioService.update(+id, updateInventarioDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.inventarioService.delete(+id);
  }
}
