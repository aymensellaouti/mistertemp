import { Test, TestingModule } from '@nestjs/testing';
import { SecondService } from './second.service';

describe('SecondService', () => {
  let service: SecondService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecondService],
    }).compile();

    service = module.get<SecondService>(SecondService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
