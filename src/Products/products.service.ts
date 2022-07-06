import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: string): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: id } });
  }

  async createOne(name: string, price: number, quantity: number) {
    const newProduct = { name, price, quantity };
    const data = await this.dataSource.transaction(async (manager) => {
      const response = await manager.getRepository(Product).save(newProduct);
      return response;
    });
    return data;
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }

  async editQuantity(id: string, quantity: number) {
    const data = await this.dataSource.transaction(async (manager) => {
      const response = await manager
        .getRepository(Product)
        .update(id, { quantity });
      return response;
    });
    return data;
  }

  async editProduct(id: string, name: string, price: number, quantity: number) {
    const data = await this.dataSource.transaction(async (manager) => {
      const response = await manager
        .getRepository(Product)
        .update(id, { name, price, quantity });
      return response;
    });
    return data;
  }
}
