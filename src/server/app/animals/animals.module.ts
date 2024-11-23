import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalRepository } from './animals.repository';

@Module({
  imports: [],
  controllers: [AnimalsController],
  providers: [AnimalsService, AnimalRepository]
})
export class AnimalsModule {}
