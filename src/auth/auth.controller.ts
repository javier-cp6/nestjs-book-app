import { 
  Controller, 
  Get,
  Post, 
  Request, 
  UseGuards,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ChangePasswordDto } from '../users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('changePassword')
  async changePassword(@Body() userData: ChangePasswordDto): Promise<any> {
    try {
      const result = await this.authService.changePassword(userData);
      if (result) {
        return { message: 'Password changed successfully' };
      } else {
        throw new BadRequestException('Failed to change password');
      }
    } catch (error) {
      throw new InternalServerErrorException('Password change failed');
    }
  }
}
