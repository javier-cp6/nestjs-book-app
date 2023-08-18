import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(params): Promise<User[]> { 
    return await this.usersRepository.find();
  }

  async findUser(userId: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { id: parseInt(userId) }});
  }

  async createUser(newUser: UserDto): Promise<User> {
    return this.usersRepository.save(newUser);
  }

  async deleteUser(userId: string): Promise<any> {
    return await this.usersRepository.delete({ id: parseInt(userId) });
  }

  async updateUser(userId: string, userData: UserDto): Promise<User> {
    let toUpdate = await this.usersRepository.findOne({ where: { id: parseInt(userId) } });
    let updated = Object.assign(toUpdate, userData);

    return this.usersRepository.save(updated); 
  }

  async login(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { username }});
  }
}