import { Injectable } from '@nestjs/common';
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
      throw error; // Lanza una excepción en caso de error
    }
  }

  async obtenerProductos(): Promise<Inventario[]> {
    try {
      return this.inventarioRepository.find(); // Obtiene todos los productos
    } catch (error) {
      console.error(error.message);
      throw error; // Lanza una excepción en caso de error
    }
  }



  create(createInventarioDto: CreateInventarioDto) {
    return 'This action adds a new inventario';
  }

  findAll() {
    return `This action returns all inventario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventario`;
  }

  update(id: number, updateInventarioDto: UpdateInventarioDto) {
    return `This action updates a #${id} inventario`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventario`;
  }
}
