import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return await this.productsService.findAll();
  }

  @Post()
  async newProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
  ) {
    return await this.productsService.createOne(name, price, quantity);
  }
}
