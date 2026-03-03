import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
    
    return {
      users,
      total: users.length,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    
    return {
      success: true,
      user: savedUser,
    };
  }

  async remove(id: number) {
    const user = await this.findOne(id); // This will throw if not found
    await this.userRepository.remove(user);
    
    return {
      success: true,
      message: `User with ID ${id} has been removed`,
    };
  }

  async findByCognitoUsername(cognitoUsername: string, email: string) {
    const user = await this.userRepository.findOne({
      where: [
        { cognitoUsername },
        { email },
      ],
    });
    
    return user;
  }
}
