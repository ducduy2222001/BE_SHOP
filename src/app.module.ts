import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { DatabaseModule } from './core/database/database.module';
import { UserController } from './modules/user/user.controller';
import { UserAddressController } from './modules/user_address/user_address.controller';
import { UserAddressModule } from './modules/user_address/user_address.module';
import { UserAddress } from './modules/user_address/user_address.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({}),
    TypeOrmModule.forFeature([User, UserAddress]),
    DatabaseModule,
    UserModule,
    UserAddressModule,
  ],
  controllers: [AppController, UserController, UserAddressController],
  providers: [AppService],
})
export class AppModule {}
