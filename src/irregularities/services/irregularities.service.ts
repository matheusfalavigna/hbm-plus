import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIrregularityDto } from '../dto/create-irregularity.dto';
import { Irregularity } from '../entities/irregularity.entity';

@Injectable()
export class IrregularitiesService {
  constructor(
    @InjectRepository(Irregularity)
    private readonly irregularityRepository: Repository<Irregularity>,
  ) {}

  async createIrregularity(
    createIrregularityDto: CreateIrregularityDto,
  ): Promise<Irregularity> {
    const irregularity = this.irregularityRepository.create(
      createIrregularityDto,
    );
    return this.irregularityRepository.save(irregularity);
  }

  async findLastIrregularity(): Promise<Irregularity | null> {
    return this.irregularityRepository.findOne({
      where: {},
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(): Promise<Irregularity[]> {
    return this.irregularityRepository.find();
  }
}
