import { IrregularitiesService } from 'src/irregularities/services/irregularities.service';
import { Measurement } from 'src/measurements/entities/measurement.entity';

const BUFFER_SIZE = 60;
const THRESHOLD = 0.2;
const MIN_IRREGULAR_COUNT = 5;

let measurementsBuffer: Measurement[] = [];

const generateMeasurement = (x: number): number => {
  return (
    -0.06366 +
    0.12613 * Math.cos(Math.PI * (x / 500)) +
    0.12258 * Math.cos(Math.PI * (x / 250)) +
    0.01593 * Math.sin(Math.PI * (x / 500)) +
    0.03147 * Math.sin(Math.PI * (x / 250))
  );
};

const checkIrregularities = async (
  irregularitiesService?: IrregularitiesService,
) => {
  if (measurementsBuffer.length < BUFFER_SIZE) return;

  let irregularCount = 0;
  measurementsBuffer.forEach((measurement, index) => {
    const expected = generateMeasurement(index * 50);
    if (
      Math.abs(measurement.value - expected) / Math.abs(expected) >
      THRESHOLD
    ) {
      irregularCount++;
    }
  });

  if (!irregularitiesService) {
    console.warn('IrregularitiesService não informado.');
    measurementsBuffer = [];
    return;
  }

  if (irregularCount >= MIN_IRREGULAR_COUNT) {
    await irregularitiesService.createIrregularity({ type: 'bip' });
    console.log('bip');
  } else {
    const lastAlert = await irregularitiesService.findLastIrregularity();
    if (lastAlert?.type === 'bip') {
      await irregularitiesService.createIrregularity({ type: 'bipbip' });
      console.log('bipbip');
    }
  }

  measurementsBuffer = [];
};

export { checkIrregularities, measurementsBuffer };
