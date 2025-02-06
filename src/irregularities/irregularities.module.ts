import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IrregularitiesController } from './controllers/irregularities.controller';
import { Irregularity } from './entities/irregularity.entity';
import { IrregularitiesService } from './services/irregularities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Irregularity])],
  controllers: [IrregularitiesController],
  providers: [IrregularitiesService],
  exports: [IrregularitiesService],
})
export class IrregularitiesModule {}
