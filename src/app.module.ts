import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';

import { User } from './modules/user/user.entity';
import { Role } from './modules/role/role.entity';
import { Cart } from './modules/cart/cart.entity';
import { Order } from './modules/order/order.entity';
import { Review } from './modules/review/review.entity';
import { Product } from './modules/product/product.entity';
import { Payment } from './modules/payment/payment.entity';
import { PayType } from './modules/pay_type/pay_type.entity';
import { Category } from './modules/category/category.entity';
import { Promotion } from './modules/promotion/promotion.entity';
import { OrderStatus } from './modules/order_status/order_status.entity';
import { UserAddress } from './modules/user_address/user_address.entity';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { ReviewModule } from './modules/review/review.module';
import { ProductModule } from './modules/product/product.module';
import { DatabaseModule } from './core/database/database.module';
import { PaymentModule } from './modules/payment/payment.module';
import { PayTypeModule } from './modules/pay_type/pay_type.module';
import { CategoryModule } from './modules/category/category.module';
import { PromotionModule } from './modules/promotion/promotion.module';
import { UserAddressModule } from './modules/user_address/user_address.module';
import { OrderStatusModule } from './modules/order_status/order_status.module';

import { roles } from './modules/role/enum/role.enum';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    AccessControlModule.forRoles(roles),
    TypeOrmModule.forFeature([
      User,
      UserAddress,
      Role,
      Cart,
      Product,
      Promotion,
      Category,
      Review,
      Order,
      OrderStatus,
      Payment,
      PayType,
    ]),
    AuthModule,
    DatabaseModule,
    UserModule,
    UserAddressModule,
    RoleModule,
    CartModule,
    ProductModule,
    PromotionModule,
    CategoryModule,
    ReviewModule,
    OrderModule,
    OrderStatusModule,
    PaymentModule,
    PayTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
