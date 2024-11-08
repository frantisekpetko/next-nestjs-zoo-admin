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
import { } from 'typeorm';
import { Animal } from './animal.entity';


@Entity({ name: 'extlink' })
export class Extlink extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @ManyToOne((type) => Animal, (animal) => animal.extlinks, {
        eager: false
    })
    @JoinColumn({
        name: 'animal_id',
    })
    animal: Animal;

    @Column({ nullable: true })
    animal_id: number;
}
