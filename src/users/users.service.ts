import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserResponse } from './dto/userResponse.dto';
import { UserInput } from './dto/userInput.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
  ) {}
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  toDto(user: UserEntity): UserResponse {
    const { password, ...dataUser } = user;
    return dataUser;
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.usersRepo.find();
    return users.map((u) => this.toDto(u));
  }

  async findOne(id: string): Promise<UserResponse> {
    const user = await this.usersRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toDto(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async create(input: UserInput): Promise<UserResponse> {
    const hashedPassword = await this.hashPassword(input.password);

    const user = this.usersRepo.create({
      ...input,
      password: hashedPassword,
    });

    const saved = await this.usersRepo.save(user);
    return this.toDto(saved);
  }

  async update(id: string, input: UserInput): Promise<UserResponse> {
    const user = await this.usersRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.username = input.username;
    user.email = input.email;
    if (input.password) {
      user.password = await this.hashPassword(input.password);
    }

    const saved = await this.usersRepo.save(user);
    return this.toDto(saved);
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
