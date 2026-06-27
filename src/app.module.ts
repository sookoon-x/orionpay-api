import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { AiModule } from './modules/ai/ai.module';
import { User } from './modules/users/entities/user.entity';
import { Wallet } from './modules/wallets/entities/wallet.entity';
import { Transaction } from './modules/payments/entities/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'orionpay',
      entities: [User, Wallet, Transaction],
      synchronize: process.env.NODE_ENV !== 'production',
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    WalletsModule,
    PaymentsModule,
    BlockchainModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}