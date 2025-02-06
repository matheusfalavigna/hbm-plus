import { Controller, Get } from '@nestjs/common';
import { IrregularitiesService } from '../services/irregularities.service';

@Controller('irregularities')
export class IrregularitiesController {
  constructor(private readonly irregularitiesService: IrregularitiesService) {}

  @Get()
  findAll() {
    return this.irregularitiesService.findAll();
  }
}
