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
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './interface/user.interface';
import { PublicUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse as ApiResult } from '../shared-response/api-response.interface';
import { Role } from 'generated/prisma';
import { Roles } from 'src/auth/decorator/public.decorator';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Public } from '../auth/decorator/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateUserDto): Promise<ApiResult<User>> {
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

  @Public()
  @ApiTags('users')
  @ApiResponse({ status: 200, description: 'Get all users' })
  @Get()
  async findAll(@Query('role') role?: Role): Promise<ApiResult<PublicUser[]>> {
    try {
      const users = role
        ? await this.usersService.findByRole(role)
        : await this.usersService.findAll();

      const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
      return {
        sucess: true,
        message: 'All users retrieved successfully',
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
  @Public()
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ApiResult<PublicUser>> {
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
  @Public()
  @Roles(Role.ADMIN)
  @Get('email/:email')
  async findByEmail(
    @Param('email') email: string,
  ): Promise<ApiResult<PublicUser>> {
    try {
      const user = await this.usersService.findByEmail(email);
      const { password, ...userWithoutPassword } = user;
      return {
        sucess: true,
        message: 'User found',
        data: userWithoutPassword,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'User not found',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Public()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResult<PublicUser>> {
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

  @Public()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<ApiResult<void>> {
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
