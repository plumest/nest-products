import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productsService.findOne(id);
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
