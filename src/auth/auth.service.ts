import { Injectable, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UserDto, ChangePasswordDto } from '../users/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userDto: UserDto): Promise<any> {
    const user = await this.usersService.findOnebyUsername(userDto.username);

    if (user && await bcrypt.compare(userDto.password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async changePassword(@Body() userData: ChangePasswordDto): Promise<User> {
    return this.usersService.changePassword(userData);
  }
}