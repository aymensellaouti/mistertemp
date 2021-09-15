import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';

@Entity()
export class Job extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
