import { Module } from '@nestjs/common';

import { PayTypeService } from './pay_type.service';
import { PayTypeController } from './pay_type.controller';

@Module({
  providers: [PayTypeService],
  exports: [PayTypeService],
  controllers: [PayTypeController],
})
export class PayTypeModule {}
