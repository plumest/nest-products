import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumerService } from 'src/kafka/consumer.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { ProducerService } from 'src/kafka/producer.service';
import { Product } from './products.entity';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ProductsController } from './productsController';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), KafkaModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
