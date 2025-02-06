import { Body, Controller, Post } from '@nestjs/common';
import { CreateMeasurementDto } from '../dto/create-measurement.dto';
import { Measurement } from '../entities/measurement.entity';
import { MeasurementsService } from '../services/measurements.service';

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  create(
    @Body() createMeasurementDto: CreateMeasurementDto,
  ): Promise<Measurement> {
    return this.measurementsService.createMeasurement(createMeasurementDto);
  }
}
