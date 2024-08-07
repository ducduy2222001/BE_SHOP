import { Controller, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../auth/auth.guard';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('getListProductByFilter')
  @UseGuards(AuthGuard)
  async getListProductByFilter(
    @Body() body: { pageIndex: number; pageSize: number },
    @Query('sale') sale?: boolean,
    @Query('popular') popular?: boolean,
  ): Promise<PaginatedResponse<Product>> {
    const { pageIndex, pageSize } = body;
    return await this.productService.findFilter({
      pageIndex,
      pageSize,
      sale,
      popular,
    });
  }

  @Post('getListProduct')
  @UseGuards(AuthGuard)
  async getListProduct(
    @Body() body: { pageIndex: number; pageSize: number },
  ): Promise<PaginatedResponse<Product>> {
    const { pageIndex, pageSize } = body;
    return await this.productService.findAll({
      pageIndex,
      pageSize,
    });
  }
}
