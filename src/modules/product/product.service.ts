import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }): Promise<PaginatedResponse<Product>> {
    const [products, total] = await this.productRepository.findAndCount({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
    });
    return { items: products, totalItems: total };
  }

  async findFilter({
    pageIndex,
    pageSize,
    sale,
    popular,
  }: {
    pageIndex: number;
    pageSize: number;
    sale?: boolean;
    popular?: boolean;
  }): Promise<PaginatedResponse<Product>> {
    const filter: Partial<Product> = {};

    if (sale !== undefined) filter.sale = sale;
    if (popular !== undefined) filter.popular = popular;

    if (Object.keys(filter).length === 0)
      throw new BadRequestException('Invalid query parameters');

    const [products, total] = await this.productRepository.findAndCount({
      where: filter,
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
    });

    return { items: products, totalItems: total };
  }
}
