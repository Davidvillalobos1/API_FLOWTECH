import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactoModule } from './contacto/contacto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PruebaModule } from './prueba/prueba.module';
import { Prueba } from './prueba/entities/prueba.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioAdminModule } from './usuario_admin/usuario_admin.module';
import { ServicioModule } from './servicio/servicio.module';
import { NuestrosTrabajosModule } from './nuestros_trabajos/nuestros_trabajos.module';
import { EstadoServicioModule } from './estado_servicio/estado_servicio.module';
import { InventarioModule } from './inventario/inventario.module';
import { Contacto } from './contacto/entities/contacto.entity';
import { EstadoServicio } from './estado_servicio/entities/estado_servicio.entity';
import { Inventario } from './inventario/entities/inventario.entity';
import { NuestrosTrabajo } from './nuestros_trabajos/entities/nuestros_trabajo.entity';
import { Servicio } from './servicio/entities/servicio.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioAdmin } from './usuario_admin/entities/usuario_admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { ServiciossController } from './servicioss/servicioss.controller';

@Module({
  imports: [ContactoModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'portafolio2023',
    database: 'flowtech',
    entities: [Contacto, EstadoServicio, Inventario, NuestrosTrabajo, Servicio, Usuario, UsuarioAdmin],
    // entities: [__dirname+"/**/*.entity{.ts,.js}"],//
    synchronize: true,
  }),

  PruebaModule,
  UsuarioModule,
  UsuarioAdminModule,
  ServicioModule,
  NuestrosTrabajosModule,
  EstadoServicioModule,
  InventarioModule,
  TypeOrmModule.forFeature([Usuario]),
  JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '1d'}
  })
],
  
  controllers: [AppController, ServiciossController],
  providers: [AppService],
})
export class AppModule {}
