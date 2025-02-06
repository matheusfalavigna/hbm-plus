import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IrregularitiesModule } from 'src/irregularities/irregularities.module';
import { MeasurementsController } from './controllers/measurements.controller';
import { Measurement } from './entities/measurement.entity';
import { MeasurementsService } from './services/measurements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement]), IrregularitiesModule],
  controllers: [MeasurementsController],
  providers: [MeasurementsService],
  exports: [MeasurementsService],
})
export class MeasurementsModule {}
