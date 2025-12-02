import { Controller, Body, Param, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { UserResponse } from './dto/userResponse.dto';
import { UserInput } from './dto/userInput.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() input: UserInput): Promise<UserResponse> {
    return this.usersService.create(input);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserResponse> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() input: UserInput,
  ): Promise<UserResponse> {
    return this.usersService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
