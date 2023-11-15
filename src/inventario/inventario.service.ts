import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Inventario } from 'src/inventario/entities/inventario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private inventarioRepository: Repository<Inventario>,
  ) {}

  async agregarProducto(inventarioData: Inventario): Promise<Inventario> {
    try {
      const nuevoInventario = this.inventarioRepository.create(inventarioData);
      return this.inventarioRepository.save(nuevoInventario);
    } catch (error) {
      console.error(error.message);
      this.handleException('Error al agregar el producto');
    }
  }

  async obtenerProductos(): Promise<Inventario[]> {
    try {
      return this.inventarioRepository.find();
    } catch (error) {
      console.error(error.message);
      this.handleException('Error al obtener los productos');
    }
  }



  create(createInventarioDto: CreateInventarioDto) {
    return 'This action adds a new inventario';
  }

  findAll() {
    return `This action returns all inventario`;
  }

  findOne(id: number) : Promise<Inventario> {
    return  this.inventarioRepository.findOneById(id); //actualizar//
  }

  update(id: number, updateInventarioDto: UpdateInventarioDto) {
    return this.inventarioRepository.update(id, updateInventarioDto)
  }



 

  async delete(id: number): Promise<void> {
    try {
      await this.inventarioRepository.delete(id);
    } catch (error) {
      console.error(error.message);
      throw new HttpException('Error al eliminar el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  private handleException(message: string): never {
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}