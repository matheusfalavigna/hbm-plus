import { IsNumber } from 'class-validator';

export class CreateMeasurementDto {
  @IsNumber()
  value: number;
}
