import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './Products/products.entity';
import { ProductsModule } from './Products/products.module';
import { DataSource } from 'typeorm';
import { ProductsRepository } from './Products/products.repository';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'str0ng_secret',
      database: 'ProductDB',
      entities: [Product],
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
    // TypeOrmModule.forFeature([Product]),
    ProductsModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
