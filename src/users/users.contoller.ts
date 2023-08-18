import { 
  Controller, 
  Get, 
  Post,
  Put,
  Delete,
  Param,
  Req,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { Request } from 'express';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Req() request: Request): Promise<User[]> { 
    return this.usersService.findAll(request.query); 
  }

  @Get(':userId')
  findUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findUser(userId);
  }

  @Post()
  createUser(@Body() newUser: UserDto): Promise<User> {
    return this.usersService.createUser(newUser);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.deleteUser(userId)
  }

  @Put(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() userData: UserDto
  ): Promise<User> {
    return this.usersService.updateUser(userId, userData);
  }
}