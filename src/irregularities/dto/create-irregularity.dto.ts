import { IsString } from 'class-validator';

export class CreateIrregularityDto {
  @IsString()
  type: 'bip' | 'bipbip';
}
