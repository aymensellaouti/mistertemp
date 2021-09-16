import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { Cv } from '../../cv/entities/cv.entity';

@Entity('user')
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany((targetEntity) => Cv, (cv) => cv.user, {})
  cvs: Cv[];
}
