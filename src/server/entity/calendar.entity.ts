
import { 
 BaseEntity,
 Column, 
 Entity,
 PrimaryGeneratedColumn,
 CreateDateColumn, 
 UpdateDateColumn 
} from 'typeorm';
import {Index, OneToMany} from 'typeorm'
import {Bill} from './bill.entity';


@Entity({ name: 'calendar' })
export class Calendar extends BaseEntity { 
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
   type: "date",   
  })
  day: string;
  
  
  @OneToMany(() => Bill, (bill) => bill.calendar)
  bills: Bill[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
