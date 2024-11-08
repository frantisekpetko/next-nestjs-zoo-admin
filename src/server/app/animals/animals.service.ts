import { Injectable, Logger } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from '../../entity/animal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalRepository } from './animals.repository';

@Injectable()
export class AnimalsService {
  private logger: Logger = new Logger(`<${AnimalsService.name}>`);

  constructor(
    @InjectRepository(AnimalRepository)
    private animalRepository: AnimalRepository,
  ) {}

  create(createAnimalDto: CreateAnimalDto) {
      return this.animalRepository.createOne(createAnimalDto);
  }

  async getPagesNumber(limit: number, search: string): Promise<number> {
    return this.animalRepository.getPagesNumber(limit, search);
  }

  findAll(page: number, limit: number, search: string): Promise<Animal[]> {
    return this.animalRepository.getAll(page, limit, search);
  }

  findOne(id: number): Promise<Animal> {
    return this.animalRepository.findOne(+id);
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return this.animalRepository.updateRecord(id, updateAnimalDto);
  }

  remove(id: number) {
    this.logger.log(`${id}`);
    return this.animalRepository.removeOne(id)
  }
}
