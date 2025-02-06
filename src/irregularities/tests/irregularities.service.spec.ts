import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIrregularityDto } from '../dto/create-irregularity.dto';
import { Irregularity } from '../entities/irregularity.entity';
import { IrregularitiesService } from '../services/irregularities.service';

describe('IrregularitiesService', () => {
  let service: IrregularitiesService;
  let repository: Repository<Irregularity>;

  const irregularityMock = { id: 1, type: 'bip', createdAt: new Date() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IrregularitiesService,
        {
          provide: getRepositoryToken(Irregularity),
          useValue: {
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn().mockResolvedValue(irregularityMock),
            findOne: jest.fn().mockResolvedValue(irregularityMock),
            find: jest.fn().mockResolvedValue([irregularityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<IrregularitiesService>(IrregularitiesService);
    repository = module.get<Repository<Irregularity>>(
      getRepositoryToken(Irregularity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createIrregularity', () => {
    it('should create and save an irregularity', async () => {
      const dto: CreateIrregularityDto = { type: 'bip' };
      const result = await service.createIrregularity(dto);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(irregularityMock);
    });
  });

  describe('findLastIrregularity', () => {
    it('should return the last irregularity', async () => {
      const result = await service.findLastIrregularity();
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {},
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(irregularityMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of irregularities', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([irregularityMock]);
    });
  });
});
