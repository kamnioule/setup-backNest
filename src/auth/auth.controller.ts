import { Body, Controller, Post, Get, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe()) // ✅ Active la validation
  @ApiBody({ type: RegisterDto }) // ✅ Déclare le DTO pour Swagger
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  @UsePipes(new ValidationPipe()) // ✅ Active la validation
  @ApiBody({ type: LoginDto }) // ✅ Déclare le DTO pour Swagger
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() 
  @Get('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }
}
