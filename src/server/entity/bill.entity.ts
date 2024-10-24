
import { 
 BaseEntity,
 Column, 
 Entity,
 PrimaryGeneratedColumn,
 CreateDateColumn, 
 UpdateDateColumn 
} from 'typeorm';
import {Index, ManyToOne, OneToMany} from 'typeorm'
import {Calendar} from './calendar.entity';
import {Product} from './product.entity';


@Entity({ name: 'bill' })
export class Bill extends BaseEntity { 
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
   type: "varchar",   
  })
  place: string;
  
  
  @ManyToOne(() => Calendar, (calendar) => calendar.bills)
  calendar: Calendar;

  @OneToMany(() => Product, (product) => product.bill)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
