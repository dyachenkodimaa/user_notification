import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface } from '../../lib/database/interfaces/database.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: Pick<UserInterface, 'name' | 'surname'>) {
    const user = await this.userService.createUser(body);
    return { message: 'User created', user };
  }
}
