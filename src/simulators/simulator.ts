import axios from 'axios';

const generateMeasurement = (x: number): number => {
  return (
    -0.06366 +
    0.12613 * Math.cos(Math.PI * (x / 500)) +
    0.12258 * Math.cos(Math.PI * (x / 250)) +
    0.01593 * Math.sin(Math.PI * (x / 500)) +
    0.03147 * Math.sin(Math.PI * (x / 250))
  );
};

const sendMeasurement = async (value: number): Promise<void> => {
  try {
    await axios.post('http://localhost:3000/measurements', { value });
    console.log(`Medição: ${value}`);
  } catch (error) {
    console.error('Erro ao enviar medição');
  }
};

const simulate = (): void => {
  let time = 0;
  setInterval(async () => {
    const baseline = generateMeasurement(time);
    const isIrregular = Math.random() < 0.1;
    const value = isIrregular
      ? baseline * (1 + (Math.random() < 0.5 ? 0.2 : -0.2))
      : baseline;
    await sendMeasurement(value);
    time += 50;
  }, 50);
};

simulate();
