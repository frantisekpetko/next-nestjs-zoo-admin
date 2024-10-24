import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtAuthService: JwtAuthService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Extract token from Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    if (!token) return false;

    const user = await this.jwtAuthService.verifyToken(token);
    if (!user) return false;

    request.user = user;
    return true;
  }
}