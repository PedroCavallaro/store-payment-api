import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getUser() {
    return this.authService.signIn('Hobart.Walker24@yahoo.com', '1234');
  }
  @Get('create')
  createUsers() {
    return this.authService.createUser();
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  getProfile(@Request() req) {
    return req.user;
  }
}
