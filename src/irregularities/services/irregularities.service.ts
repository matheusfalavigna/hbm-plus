import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Irregularity } from '../entities/irregularity.entity';

@Injectable()
export class IrregularitiesService {
  constructor(
    @InjectRepository(Irregularity)
    private readonly irregularityRepository: Repository<Irregularity>,
  ) {}

  async findAll(): Promise<Irregularity[]> {
    return this.irregularityRepository.find();
  }
}
