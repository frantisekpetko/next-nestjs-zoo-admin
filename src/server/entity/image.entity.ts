import {
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Animal } from './animal.entity';

@Entity({ name: 'image' })
export class Image extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  urlName: string;

  @ManyToOne((type) => Animal, (animal) => animal.images, {
    eager: false,
  })

  @JoinColumn({
    name: 'animal_id',
  })
  animal: Animal;

  @Column({ nullable: true })
  animal_id: number;
}
