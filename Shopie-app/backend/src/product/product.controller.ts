import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { Product } from './interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse as ApiResult } from '../shared-response/api-response.interface';
import { UseGuards } from '@nestjs/common';
import { jwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/public.decorator';
import { Role } from 'generated/prisma';
import { Public } from '../auth/decorator/public.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth() //used wen route is protected
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: ' create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successsfully' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateProductDto): Promise<ApiResult<Product>> {
    try {
      const product = await this.productsService.create(data);
      return {
        sucess: true,
        message: 'Product created successfully',
        data: product,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to create product',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Public()
  @Get()
  async findAll(): Promise<ApiResult<Product[]>> {
    try {
      const products = await this.productsService.findAll();
      return {
        sucess: true,
        message: 'Products retrieved successfully',
        data: products,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to retrieve products',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Public()
  @Get('search')
  async findByName(@Query('name') name: string): Promise<ApiResult<Product[]>> {
    try {
      const results = await this.productsService.findByName(name);
      return {
        sucess: true,
        message: 'Products found successfully',
        data: results,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to search products',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResult<Product>> {
    try {
      const product = await this.productsService.findOne(id);
      return {
        sucess: true,
        message: 'Product retrieved successfully',
        data: product,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to find product',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductDto,
  ): Promise<ApiResult<Product>> {
    try {
      const product = await this.productsService.update(id, updateDto);
      return {
        sucess: true,
        message: 'Product updated successfully',
        data: product,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to update product',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<ApiResult<null>> {
    try {
      const result = await this.productsService.delete(id);
      return {
        sucess: true,
        message: result.message,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to delete product',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
