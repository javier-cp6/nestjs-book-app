import { 
  Controller, 
  Get,
  Post, 
  Req, 
  UseGuards,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from '../users/user.dto';

@ApiTags('auth') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ description: 'Returns access token' }) 
  async login(@Body() user: UserDto, @Req() req: Request): Promise<any> {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') 
  @Get('profile')
  @ApiOperation({ description: 'Returns user profile' }) 
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
