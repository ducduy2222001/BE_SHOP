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
import { RoleModule } from './modules/role/role.module';
import { RoleController } from './modules/role/role.controller';
import { Role } from './modules/role/role.entity';
import { CartController } from './modules/cart/cart.controller';
import { CartModule } from './modules/cart/cart.module';
import { Cart } from './modules/cart/cart.entity';
import { ProductModule } from './modules/product/product.module';
import { ProductController } from './modules/product/product.controller';
import { Product } from './modules/product/product.entity';
import { PromotionController } from './modules/promotion/promotion.controller';
import { PromotionService } from './modules/promotion/promotion.service';
import { PromotionModule } from './modules/promotion/promotion.module';
import { Promotion } from './modules/promotion/promotion.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({}),
    TypeOrmModule.forFeature([
      User,
      UserAddress,
      Role,
      Cart,
      Product,
      Promotion,
    ]),
    DatabaseModule,
    UserModule,
    UserAddressModule,
    RoleModule,
    CartModule,
    ProductModule,
    PromotionModule,
  ],
  controllers: [
    AppController,
    UserController,
    UserAddressController,
    RoleController,
    CartController,
    ProductController,
    PromotionController,
  ],
  providers: [AppService, PromotionService],
})
export class AppModule {}
