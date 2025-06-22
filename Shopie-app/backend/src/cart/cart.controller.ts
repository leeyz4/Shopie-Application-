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
  // Query,
} from '@nestjs/common';
import { CartsService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiResponse as ApiResult } from '../shared-response/api-response.interface';
import { Cart } from 'generated/prisma';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public.decorator';

@ApiTags('carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateCartDto): Promise<ApiResult<Cart>> {
    try {
      const cart = await this.cartService.create(data);
      return {
        sucess: true,
        message: 'Cart created successfully',
        data: cart,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to create cart',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Public()
  @ApiTags('carts')
  @ApiResponse({ status: 200, description: 'Get all carts' })
  @Get()
  async findAll(): Promise<ApiResult<Cart[]>> {
    try {
      const carts = await this.cartService.findAll();
      return {
        sucess: true,
        message: 'Products retrieved successfully',
        data: carts,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to retrieve carts',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResult<Cart>> {
    try {
      const cart = await this.cartService.findOne(id);
      return {
        sucess: true,
        message: 'Cart retrieved successfully',
        data: cart,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to find product',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCartDto,
  ): Promise<ApiResult<Cart>> {
    try {
      const cart = await this.cartService.update(id, updateDto);
      return {
        sucess: true,
        message: 'Cart updated successfully',
        data: cart,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to update cart',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<ApiResult<null>> {
    try {
      const result = await this.cartService.delete(id);
      return {
        sucess: true,
        message: result.message,
      };
    } catch (error) {
      return {
        sucess: false,
        message: 'Failed to delete cart',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
