import { Module } from '@nestjs/common';

import { OrderStatusService } from './order_status.service';
import { OrderStatusController } from './order_status.controller';

@Module({
  providers: [OrderStatusService],
  exports: [OrderStatusService],
  controllers: [OrderStatusController],
})
export class OrderStatusModule {}
