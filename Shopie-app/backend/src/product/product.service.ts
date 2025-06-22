import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Product } from './interface/product.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<Product> {
    try {
      const product = await this.prisma.product.create({ data });
      return {
        ...product,
        created_at: product.createdAT,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Failed to create product',
      );
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.prisma.product.findMany();
      return products.map((product) => ({
        ...product,
        created_at: product.createdAT,
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Failed to fetch products',
      );
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      return {
        ...product,
        created_at: product.createdAT,
      };
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to fetch product',
      );
    }
  }

  async findByName(name: string): Promise<Product[]> {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
      });
      return products.map((product) => ({
        ...product,
        created_at: product.createdAT,
      }));
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error
          ? error.message
          : `Failed to fetch products with name ${name}`,
      );
    }
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    try {
      const existing = await this.prisma.product.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      const updated = await this.prisma.product.update({
        where: { id },
        data,
      });

      return {
        ...updated,
        created_at: updated.createdAT,
      };
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to update product',
      );
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      await this.prisma.product.delete({ where: { id } });

      return { message: `Product ${product.name} deleted successfully` };
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to delete product',
      );
    }
  }
}
