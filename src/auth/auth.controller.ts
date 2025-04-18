import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';  // Ajoute cette ligne

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() Body) {
    return this.authService.register(Body.username, Body.password, Body.role);
  }
}
