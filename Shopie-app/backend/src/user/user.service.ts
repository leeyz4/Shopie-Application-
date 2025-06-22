/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/unbound-method */
import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User as UserEntity } from './interface/user.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role, User as PrismaUser } from 'generated/prisma';
// import { MailerService } from './../mailer/mailer.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly mailerService: MailerService,
  ) {}

  private mapPrismaUserToInterface(user: PrismaUser): UserEntity {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      created_at: user.createdAT,
    };
  }

  // async sendWelcomeEmail(to: string, name: string) {
  //   await this.mailerService.sendMail({
  //     to,
  //     subject: 'Welcome to Shopie!',
  //     template: './welcome', // corresponds to templates/welcome.hbs
  //     context: {
  //       name,
  //     },
  //   });
  // }

  async create(data: CreateUserDto): Promise<UserEntity> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ConflictException(
          `User with email ${data.email} already exists`,
        );
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          role: data.role ?? Role.CUSTOMER,
        },
      });

      // await this.mailerService.sendWelcomeEmail(user.email, user.name);

      return this.mapPrismaUserToInterface(user);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.prisma.user.findMany({ orderBy: { id: 'asc' } });
      return users.map(this.mapPrismaUserToInterface);
    } catch {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async findByRole(role: Role): Promise<UserEntity[]> {
    try {
      const users = await this.prisma.user.findMany({
        where: { role },
        orderBy: { id: 'asc' },
      });
      return users.map(this.mapPrismaUserToInterface);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve users by role: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.mapPrismaUserToInterface(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return this.mapPrismaUserToInterface(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    try {
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
      });
      return this.mapPrismaUserToInterface(updatedUser);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update user: ${error.message}`,
      );
    }
  }

  async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const isMatch = await (bcrypt as typeof bcrypt).compare(
      currentPassword,
      user.password,
    );
    if (!isMatch) {
      throw new ConflictException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id },
      data: { password: hashedNewPassword },
    });

    return { message: 'Password changed successfully' };
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.prisma.user.delete({ where: { id } });

    return { message: `User ${user.name} has been permanently deleted` };
  }
}
