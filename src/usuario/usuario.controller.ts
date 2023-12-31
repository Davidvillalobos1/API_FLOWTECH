import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadRequestException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private jwtService: JwtService) { }

  @Post('Registrarse')
  async register(
    @Body('nombre') nombre: string,
    @Body('apellido') apellido: string,
    @Body('email') email: string,
    @Body('contrasena') contrasena: string
  ) {
    const hashedPassword = await bcrypt.hash(contrasena, 12);

    const user = await this.usuarioService.create({
      nombre,
      apellido,
      email,
      contrasena: hashedPassword
    });

    const jwt = await this.jwtService.signAsync({ id: user.id });
    return {
      message: 'Usuario registrado exitosamente',
      token: jwt,
    };
  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('contrasena') contrasena: string,
    @Res({ passthrough: true }) response: Response
  ) {
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
  }



  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'cerrado sesion'
    }
  }
}
