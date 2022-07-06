import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
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
    const product = await this.productsService.findOne(id);
    if (!product) throw new NotFoundException();
    return product;
  }

  @Post()
  async newProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
  ) {
    return await this.productsService.createOne(name, price, quantity);
  }

  @Patch(':id')
  async updateQuantity(
    @Param('id') id: string,
    @Body('quantity') quantity?: number,
  ) {
    return await this.productsService.editQuantity(id, quantity);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('price') price?: number,
    @Body('quantity') quantity?: number,
  ) {
    return await this.productsService.editProduct(id, name, price, quantity);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }
}
