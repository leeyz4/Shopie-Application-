/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Put,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from 'src/shared-response/api-response.interface';
import { Role } from 'generated/prisma';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateUserDto): Promise<ApiResponse<User>> {
    try {
      const user = await this.usersService.create(data);
      return {
        sucess: true,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to create user',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('role/:role')
  async findByRole(@Query('role') role?: Role): Promise<ApiResponse<User[]>> {
    try {
      let users: User[];

      if (role) {
        users = await this.usersService.findByRole(role);
      } else {
        users = await this.usersService.findAll();
      }

      const usersWithoutPasswords = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword as User;
      });

      return {
        sucess: true,
        message: `Retrieved ${users.length} users`,
        data: usersWithoutPasswords,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to retrieve users',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }

  //Get user by ID
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ApiResponse<User>> {
    try {
      const user = await this.usersService.findOne(id);
      const { password, ...userWithoutPassword } = user;
      return {
        sucess: true,
        message: 'User found',
        data: userWithoutPassword as User,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'User not found',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }

  //Get user by email
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<User>> {
    try {
      if (updateUserDto.role) {
        if (updateUserDto.role !== Role.ADMIN) {
          throw new ForbiddenException('Only admins can update user roles');
        }

        const existingUser = await this.usersService.findOne(id);
        if (existingUser?.role === updateUserDto.role) {
          throw new BadRequestException(
            `User already has role ${updateUserDto.role}`,
          );
        }
      }

      const updatedUser = await this.usersService.update(id, updateUserDto);
      const { password, ...userWithoutPassword } = updatedUser;
      return {
        sucess: true,
        message: 'User updated successfully',
        data: userWithoutPassword as User,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to update user',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<ApiResponse<void>> {
    try {
      await this.usersService.delete(id);
      return {
        sucess: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting user');
    }
  }
}
