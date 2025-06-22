import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cart } from 'generated/prisma';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCartDto): Promise<Cart> {
    try {
      const cart = await this.prisma.cart.create({ data });
      return cart;
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to create cart',
      );
    }
  }

  async findAll(): Promise<Cart[]> {
    try {
      const carts = await this.prisma.cart.findMany();
      return carts;
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Failed to fetch carts',
      );
    }
  }

  async findOne(id: string): Promise<Cart> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { id },
      });

      if (!cart) {
        throw new NotFoundException(`Cart with id ${id} not found`);
      }

      return cart;
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to fetch cart',
      );
    }
  }

  async update(id: string, data: UpdateCartDto): Promise<Cart> {
    try {
      const existing = await this.prisma.cart.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Cart with id ${id} not found`);
      }

      const updated = await this.prisma.cart.update({
        where: { id },
        data,
      });

      return updated;
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to update cart',
      );
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const cart = await this.prisma.cart.findUnique({ where: { id } });

      if (!cart) {
        throw new NotFoundException(`Cart with id ${id} not found`);
      }

      await this.prisma.cart.delete({ where: { id } });

      return { message: `Cart ${cart.id} deleted successfully` };
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to delete cart',
      );
    }
  }
}
