import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './measurements/entities/measurement.entity';
import { MeasurementsModule } from './measurements/measurements.module';
import { IrregularitiesModule } from './irregularities/irregularities.module';
import { Irregularity } from './irregularities/entities/irregularity.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      schema: 'public',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Measurement, Irregularity]),
    MeasurementsModule,
    IrregularitiesModule,
  ],
})
export class AppModule {}
