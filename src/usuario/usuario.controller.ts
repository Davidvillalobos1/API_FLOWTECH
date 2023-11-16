import { Controller, Get, Post, Body, Res, BadRequestException, HttpStatus, ValidationPipe, UsePipes } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  @Post('registrarse')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() usuarioDto: CreateUsuarioDto) {
    try {
      const existingUser = await this.usuarioService.findOneByEmail(usuarioDto.email);
      if (existingUser) {
        throw new BadRequestException('El correo electrónico ya está registrado', 'CorreoRegistrado');
      }

      const hashedPassword = await bcrypt.hash(usuarioDto.contrasena, 12);
      const user = await this.usuarioService.create({
        nombre: usuarioDto.nombre,
        apellido: usuarioDto.apellido,
        email: usuarioDto.email,
        contrasena: hashedPassword,
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
    @Body() usuarioDto: CreateUsuarioDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      if (!usuarioDto.email || !usuarioDto.contrasena) {
        throw new BadRequestException('Credenciales incompletas');
      }

      const usuario = await this.usuarioService.findOneByEmail(usuarioDto.email);

      if (!usuario) {
        throw new BadRequestException('Usuario no registrado', 'UsuarioNoRegistrado');
      }

      const passwordMatch = await bcrypt.compare(usuarioDto.contrasena, usuario.contrasena);

      if (!passwordMatch) {
        throw new BadRequestException('Credenciales inválidas', 'CredencialesInvalidas');
      }

      const jwt = await this.jwtService.signAsync({ id: usuario.id, email: usuario.email });
      response.cookie('jwt', jwt, { httpOnly: true });

      return {
        message: 'Inicio de sesión correcto',
        token: jwt,
      };
    } catch (error) {
      if (error.response?.message === 'Usuario no registrado') {
        
        return {
          message: error.response.message,
          status: HttpStatus.BAD_REQUEST,
        };
      } else {
        return this.handleException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Cerrado sesión',
    };
  }

  

  private handleException(error: any, status: HttpStatus): never {
    throw new BadRequestException({ message: error.message || 'Error interno del servidor', status });
  }
}
