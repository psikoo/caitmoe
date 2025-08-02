import { Module } from '@nestjs/common';

import { wwwService } from './www.service';
import { wwwController } from './www.controller';

@Module({
  imports: [],
  controllers: [wwwController],
  providers: [wwwService]
})
export class wwwModule {}
