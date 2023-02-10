import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtAuthenticationGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers);
    const accessToken = request.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
