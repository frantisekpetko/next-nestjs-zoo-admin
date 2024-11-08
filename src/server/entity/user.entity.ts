import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BaseEntity
} from 'typeorm';
import { Provider } from '../common/types/user';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Unique(['username'])
@Entity({ name: 'user' })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Exclude()
  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: false })
  provider: Provider;

  @Column({ nullable: true })
  providerId: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  picture: string;

  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Column()
  @UpdateDateColumn()
  updated_at?: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
