import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Index, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Bill } from './bill.entity';
import { Category } from './category.entity';
import { Price } from './price.entity';
import { Resource } from './resource.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @ManyToOne(() => Bill, (bill) => bill.products)
  bill: Bill;

  @OneToMany(() => Category, (category) => category.product)
  categorys: Category[];

  @JoinColumn()
  @OneToOne(() => Price)
  price: Price;

  @JoinColumn()
  @OneToOne(() => Resource)
  resource: Resource;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
