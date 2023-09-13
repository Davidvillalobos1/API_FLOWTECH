import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {Response, Request} from 'express';
import { constants } from 'buffer';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private jwtService: JwtService) {}

  @Post('registrarse')
  async registrarse (

    @Body('nombre') nombre: string,
    @Body('apellido') apellido: string,
    @Body('email') email: string,
    @Body('contrasena') contrasena: string
   ){
      const hashedContrasena = await bcrypt.hash(contrasena, 12);
      return this.appService.create({
        nombre,
        apellido,
        email,
        contrasena: hashedContrasena
      })
  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('contrasena') contrasena: string,
    @Res({ passthrough: true}) response: Response
  ) {
    const usuario = await this.appService.findOneByEmail(email);

    if (!usuario) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
 
    if (!passwordMatch) {
      throw new BadRequestException('Credenciales inválidas');
    }
    const jwt = await this.jwtService.signAsync({id: usuario.id});
    response.cookie('jwt', jwt, {httpOnly: true});
    return {
      message: 'inicio de sesion correcto'
    };
  }


  @Get('usuario')  
  async usuario(@Req() request: Request){
    try{
    const cookie = request.cookies ['jwt'];

    const data = await this.jwtService.verifyAsync(cookie);
    
    if(!data){
      throw new UnauthorizedException();
    }
    
    const usuario = this.appService.findOne({ id: data['id'] });
  
    const {password, ...result} = usuario;
    return result;
  } catch (e){

    throw new UnauthorizedException();
  }
   

  }
}
