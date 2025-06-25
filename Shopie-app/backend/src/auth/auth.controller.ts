import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { jwtAuthGuard } from './guards/jwt_auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorator/public.decorator';
import { Role } from 'generated/prisma';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.authService.register(dto);
    return {
      success: true,
      message: 'User registered successfully',
      data: user,
    };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const { token, user } = await this.authService.login(dto);
    return {
      success: true,
      message: 'Login successful',
      token,
      user,
    };
  }
  //admin only access
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('create')
  createProduct() {}
}
