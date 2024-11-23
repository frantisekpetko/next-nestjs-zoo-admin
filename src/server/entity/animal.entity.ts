import {
  BeforeInsert,
  ManyToOne,
  OneToMany,
  OneToOne,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from './image.entity';
import { Extlink } from './extlink.entity';

//@Unique(['username'])
@Entity({ name: 'animal' })
export class Animal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  latinname: string;

  @Column()
  description: string;

  @OneToMany((type) => Image, (image) => image.animal, {
      onDelete: 'CASCADE', onUpdate: 'CASCADE' //orphanedRowAction: 'delete', cascade: true, 
  })
  images: Image[];

  @OneToMany((type) => Extlink, (extlink) => extlink.animal, {
      onDelete: 'CASCADE', onUpdate: 'CASCADE' //orphanedRowAction: 'delete', cascade: true, 
  })
  extlinks: Extlink[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
