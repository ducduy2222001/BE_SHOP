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

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({}),
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
