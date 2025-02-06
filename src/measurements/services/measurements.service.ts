import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeasurementDto } from '../dto/create-measurement.dto';
import { Measurement } from '../entities/measurement.entity';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementRepository: Repository<Measurement>,
  ) {}

  async createMeasurement(
    createMeasurementDto: CreateMeasurementDto,
  ): Promise<Measurement> {
    const measurement = this.measurementRepository.create(createMeasurementDto);
    return this.measurementRepository.save(measurement);
  }

  async findAll(): Promise<Measurement[]> {
    return this.measurementRepository.find();
  }
}
