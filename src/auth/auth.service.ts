import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDto } from 'src/users/user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userDto: UserDto): Promise<any> {
    const user = await this.usersService.login(userDto.username);
    if (user && user.password === userDto.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}