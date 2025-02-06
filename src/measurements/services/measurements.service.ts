import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IrregularitiesService } from 'src/irregularities/services/irregularities.service';
import {
  checkIrregularities,
  measurementsBuffer,
} from 'src/utils/checkIrregularities';
import { Repository } from 'typeorm';
import { CreateMeasurementDto } from '../dto/create-measurement.dto';
import { Measurement } from '../entities/measurement.entity';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementRepository: Repository<Measurement>,
    private readonly irregularitiesService: IrregularitiesService,
  ) {}

  async createMeasurement(
    createMeasurementDto: CreateMeasurementDto,
  ): Promise<Measurement> {
    const measurement = this.measurementRepository.create(createMeasurementDto);
    const savedMeasurement = await this.measurementRepository.save(measurement);

    measurementsBuffer.push(savedMeasurement);
    checkIrregularities(this.irregularitiesService);

    return savedMeasurement;
  }

  async findAll(): Promise<Measurement[]> {
    return this.measurementRepository.find();
  }
}
