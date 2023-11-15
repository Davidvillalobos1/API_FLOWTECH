import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadRequestException, HttpStatus, ValidationPipe, UsePipes } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { validate } from 'class-validator';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private jwtService: JwtService) { }

  @Post('registrarse')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() usuarioDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(usuarioDto.contrasena, 12);

    try {
      const existingUser = await this.usuarioService.findOneByEmail(usuarioDto.email);
      if (existingUser) {
        throw new BadRequestException('El correo electrónico ya está registrado');
      }

      const user = await this.usuarioService.create({
        nombre: usuarioDto.nombre,
        apellido: usuarioDto.apellido,
        email: usuarioDto.email,
        contrasena: hashedPassword
      });

      const jwt = await this.jwtService.signAsync({ id: user.id });
      return {
        message: 'Usuario registrado exitosamente',
        token: jwt,
      };
    } catch (error) {
      return this.handleException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('contrasena') contrasena: string,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      const usuario = await this.usuarioService.findOneByEmail(email);

      if (!usuario) {
        throw new BadRequestException('Credenciales inválidas');
      }

      const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);

      if (!passwordMatch) {
        throw new BadRequestException('Credenciales inválidas');
      }

      const jwt = await this.jwtService.signAsync({ id: usuario.id, email: usuario.email });
      response.cookie('jwt', jwt, { httpOnly: true });

      return {
        message: 'Inicio de sesión correcto',
        token: jwt,
      };
    } catch (error) {
      return this.handleException(error.message, HttpStatus.BAD_REQUEST);
    }
  }



  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'cerrado sesion'
    }
  }

  @Get('verificar-correo/:email')
  async verificarCorreo(@Param('email') email: string) {
    const existingUser = await this.usuarioService.findOneByEmail(email);
    return { existe: !!existingUser };
  }

  private handleException(error: any, status: HttpStatus): never {
    throw new BadRequestException({ message: error.message || 'Error interno del servidor', status });
  }
}
