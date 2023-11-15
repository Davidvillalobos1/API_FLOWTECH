import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioAdminService } from './usuario_admin.service';
import { CreateUsuarioAdminDto } from './dto/create-usuario_admin.dto';

@Controller('usuario-admin')
export class UsuarioAdminController {
  constructor(private readonly usuarioAdminService: UsuarioAdminService) { }

  @Post('crear')
  create(@Body() createUsuarioAdminDto: CreateUsuarioAdminDto) {
    return this.usuarioAdminService.create(createUsuarioAdminDto);
  }


  @Post('login') 
  async login(@Body() loginData: { email_admin: string; contrasena_admin: string }) {
    try {
      const usuario = await this.usuarioAdminService.findByEmail(loginData.email_admin);

      if (usuario) {
        const isPasswordMatch = await this.usuarioAdminService.comparePasswords(
          loginData.contrasena_admin,
          usuario.contrasena_admin,
        );

        if (isPasswordMatch) {
          return { message: 'Usuario inició sesión correctamente' };
        }
      }

      return { message: 'Error de inicio de sesión. Verifica tus credenciales.' };
    } catch (error) {
      console.error('Error en la función login:', error);
      return { message: 'Error en la función login. Por favor, inténtalo de nuevo.' };
    }

  }

  findAll() {
    return this.usuarioAdminService.findAll();
  }

}
