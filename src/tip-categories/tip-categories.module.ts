import { Module } from '@nestjs/common';
import { TipCategoriesController } from './tip-categories.controller';
import { TipCategoriesService } from './tip-categories.service';

@Module({
  controllers: [TipCategoriesController],
  providers: [TipCategoriesService]
})
export class TipCategoriesModule {}
