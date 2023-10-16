import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: 'Acceso no autorizado' });
      return;
    }

    try {
      const payload = this.jwtService.verify(token);
      req.user = payload; 
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
  }
}

