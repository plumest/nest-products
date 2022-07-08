import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumerService } from 'src/kafka/consumer.service';
import { ProducerService } from 'src/kafka/producer.service';
import { Connection, DataSource, Repository } from 'typeorm';
import { Product } from './products.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<any> {
    return this.productsRepository.find();
    // const data = await this.productsRepository.find();
    // const topics = data.map((product) => product.name);
    // return this.consumerService.consume({ topics }, {});
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
    await this.producerService.produce({
      topic: name,
      messages: [{ value: JSON.stringify({ price, quantity }) }],
    });
    // const data = await this.productsRepository.createOne(newProduct);
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
