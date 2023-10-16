import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: any): Promise<string> {
    const payload = { sub: user.id, username: user.username };

    try {
      const token = this.jwtService.sign(payload);

      return token;
    } catch (error) {
      throw new Error('Error al generar el token JWT');
    }
  }
}
